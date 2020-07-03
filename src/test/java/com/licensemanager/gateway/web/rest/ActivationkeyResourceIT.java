package com.licensemanager.gateway.web.rest;

import com.licensemanager.gateway.GatewayApp;
import com.licensemanager.gateway.domain.Activationkey;
import com.licensemanager.gateway.repository.ActivationkeyRepository;
import com.licensemanager.gateway.service.ActivationkeyService;
import com.licensemanager.gateway.service.dto.ActivationkeyDTO;
import com.licensemanager.gateway.service.mapper.ActivationkeyMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ActivationkeyResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ActivationkeyResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEYACTIVATION = "AAAAAAAAAA";
    private static final String UPDATED_KEYACTIVATION = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCTNAME = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCTNAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_NBREPOSTE = 1;
    private static final Integer UPDATED_NBREPOSTE = 2;

    private static final Integer DEFAULT_NBREINSTANCEON = 1;
    private static final Integer UPDATED_NBREINSTANCEON = 2;

    @Autowired
    private ActivationkeyRepository activationkeyRepository;

    @Autowired
    private ActivationkeyMapper activationkeyMapper;

    @Autowired
    private ActivationkeyService activationkeyService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActivationkeyMockMvc;

    private Activationkey activationkey;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Activationkey createEntity(EntityManager em) {
        Activationkey activationkey = new Activationkey()
            .username(DEFAULT_USERNAME)
            .keyactivation(DEFAULT_KEYACTIVATION)
            .productname(DEFAULT_PRODUCTNAME)
            .nbreposte(DEFAULT_NBREPOSTE)
            .nbreinstanceon(DEFAULT_NBREINSTANCEON);
        return activationkey;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Activationkey createUpdatedEntity(EntityManager em) {
        Activationkey activationkey = new Activationkey()
            .username(UPDATED_USERNAME)
            .keyactivation(UPDATED_KEYACTIVATION)
            .productname(UPDATED_PRODUCTNAME)
            .nbreposte(UPDATED_NBREPOSTE)
            .nbreinstanceon(UPDATED_NBREINSTANCEON);
        return activationkey;
    }

    @BeforeEach
    public void initTest() {
        activationkey = createEntity(em);
    }

    @Test
    @Transactional
    public void createActivationkey() throws Exception {
        int databaseSizeBeforeCreate = activationkeyRepository.findAll().size();
        // Create the Activationkey
        ActivationkeyDTO activationkeyDTO = activationkeyMapper.toDto(activationkey);
        restActivationkeyMockMvc.perform(post("/api/activationkeys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(activationkeyDTO)))
            .andExpect(status().isCreated());

        // Validate the Activationkey in the database
        List<Activationkey> activationkeyList = activationkeyRepository.findAll();
        assertThat(activationkeyList).hasSize(databaseSizeBeforeCreate + 1);
        Activationkey testActivationkey = activationkeyList.get(activationkeyList.size() - 1);
        assertThat(testActivationkey.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testActivationkey.getKeyactivation()).isEqualTo(DEFAULT_KEYACTIVATION);
        assertThat(testActivationkey.getProductname()).isEqualTo(DEFAULT_PRODUCTNAME);
        assertThat(testActivationkey.getNbreposte()).isEqualTo(DEFAULT_NBREPOSTE);
        assertThat(testActivationkey.getNbreinstanceon()).isEqualTo(DEFAULT_NBREINSTANCEON);
    }

    @Test
    @Transactional
    public void createActivationkeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = activationkeyRepository.findAll().size();

        // Create the Activationkey with an existing ID
        activationkey.setId(1L);
        ActivationkeyDTO activationkeyDTO = activationkeyMapper.toDto(activationkey);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActivationkeyMockMvc.perform(post("/api/activationkeys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(activationkeyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Activationkey in the database
        List<Activationkey> activationkeyList = activationkeyRepository.findAll();
        assertThat(activationkeyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllActivationkeys() throws Exception {
        // Initialize the database
        activationkeyRepository.saveAndFlush(activationkey);

        // Get all the activationkeyList
        restActivationkeyMockMvc.perform(get("/api/activationkeys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(activationkey.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].keyactivation").value(hasItem(DEFAULT_KEYACTIVATION)))
            .andExpect(jsonPath("$.[*].productname").value(hasItem(DEFAULT_PRODUCTNAME)))
            .andExpect(jsonPath("$.[*].nbreposte").value(hasItem(DEFAULT_NBREPOSTE)))
            .andExpect(jsonPath("$.[*].nbreinstanceon").value(hasItem(DEFAULT_NBREINSTANCEON)));
    }
    
    @Test
    @Transactional
    public void getActivationkey() throws Exception {
        // Initialize the database
        activationkeyRepository.saveAndFlush(activationkey);

        // Get the activationkey
        restActivationkeyMockMvc.perform(get("/api/activationkeys/{id}", activationkey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(activationkey.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.keyactivation").value(DEFAULT_KEYACTIVATION))
            .andExpect(jsonPath("$.productname").value(DEFAULT_PRODUCTNAME))
            .andExpect(jsonPath("$.nbreposte").value(DEFAULT_NBREPOSTE))
            .andExpect(jsonPath("$.nbreinstanceon").value(DEFAULT_NBREINSTANCEON));
    }
    @Test
    @Transactional
    public void getNonExistingActivationkey() throws Exception {
        // Get the activationkey
        restActivationkeyMockMvc.perform(get("/api/activationkeys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActivationkey() throws Exception {
        // Initialize the database
        activationkeyRepository.saveAndFlush(activationkey);

        int databaseSizeBeforeUpdate = activationkeyRepository.findAll().size();

        // Update the activationkey
        Activationkey updatedActivationkey = activationkeyRepository.findById(activationkey.getId()).get();
        // Disconnect from session so that the updates on updatedActivationkey are not directly saved in db
        em.detach(updatedActivationkey);
        updatedActivationkey
            .username(UPDATED_USERNAME)
            .keyactivation(UPDATED_KEYACTIVATION)
            .productname(UPDATED_PRODUCTNAME)
            .nbreposte(UPDATED_NBREPOSTE)
            .nbreinstanceon(UPDATED_NBREINSTANCEON);
        ActivationkeyDTO activationkeyDTO = activationkeyMapper.toDto(updatedActivationkey);

        restActivationkeyMockMvc.perform(put("/api/activationkeys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(activationkeyDTO)))
            .andExpect(status().isOk());

        // Validate the Activationkey in the database
        List<Activationkey> activationkeyList = activationkeyRepository.findAll();
        assertThat(activationkeyList).hasSize(databaseSizeBeforeUpdate);
        Activationkey testActivationkey = activationkeyList.get(activationkeyList.size() - 1);
        assertThat(testActivationkey.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testActivationkey.getKeyactivation()).isEqualTo(UPDATED_KEYACTIVATION);
        assertThat(testActivationkey.getProductname()).isEqualTo(UPDATED_PRODUCTNAME);
        assertThat(testActivationkey.getNbreposte()).isEqualTo(UPDATED_NBREPOSTE);
        assertThat(testActivationkey.getNbreinstanceon()).isEqualTo(UPDATED_NBREINSTANCEON);
    }

    @Test
    @Transactional
    public void updateNonExistingActivationkey() throws Exception {
        int databaseSizeBeforeUpdate = activationkeyRepository.findAll().size();

        // Create the Activationkey
        ActivationkeyDTO activationkeyDTO = activationkeyMapper.toDto(activationkey);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActivationkeyMockMvc.perform(put("/api/activationkeys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(activationkeyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Activationkey in the database
        List<Activationkey> activationkeyList = activationkeyRepository.findAll();
        assertThat(activationkeyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteActivationkey() throws Exception {
        // Initialize the database
        activationkeyRepository.saveAndFlush(activationkey);

        int databaseSizeBeforeDelete = activationkeyRepository.findAll().size();

        // Delete the activationkey
        restActivationkeyMockMvc.perform(delete("/api/activationkeys/{id}", activationkey.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Activationkey> activationkeyList = activationkeyRepository.findAll();
        assertThat(activationkeyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
