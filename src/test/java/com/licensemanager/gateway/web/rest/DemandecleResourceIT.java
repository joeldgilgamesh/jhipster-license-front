package com.licensemanager.gateway.web.rest;

import com.licensemanager.gateway.GatewayApp;
import com.licensemanager.gateway.domain.Demandecle;
import com.licensemanager.gateway.repository.DemandecleRepository;
import com.licensemanager.gateway.service.DemandecleService;
import com.licensemanager.gateway.service.dto.DemandecleDTO;
import com.licensemanager.gateway.service.mapper.DemandecleMapper;

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
 * Integration tests for the {@link DemandecleResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DemandecleResourceIT {

    private static final Integer DEFAULT_NBREPOSTE = 1;
    private static final Integer UPDATED_NBREPOSTE = 2;

    private static final Integer DEFAULT_DUREECLE = 1;
    private static final Integer UPDATED_DUREECLE = 2;

    private static final String DEFAULT_PRODUCTNAME = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCTNAME = "BBBBBBBBBB";

    @Autowired
    private DemandecleRepository demandecleRepository;

    @Autowired
    private DemandecleMapper demandecleMapper;

    @Autowired
    private DemandecleService demandecleService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDemandecleMockMvc;

    private Demandecle demandecle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Demandecle createEntity(EntityManager em) {
        Demandecle demandecle = new Demandecle()
            .nbreposte(DEFAULT_NBREPOSTE)
            .dureecle(DEFAULT_DUREECLE)
            .productname(DEFAULT_PRODUCTNAME);
        return demandecle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Demandecle createUpdatedEntity(EntityManager em) {
        Demandecle demandecle = new Demandecle()
            .nbreposte(UPDATED_NBREPOSTE)
            .dureecle(UPDATED_DUREECLE)
            .productname(UPDATED_PRODUCTNAME);
        return demandecle;
    }

    @BeforeEach
    public void initTest() {
        demandecle = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemandecle() throws Exception {
        int databaseSizeBeforeCreate = demandecleRepository.findAll().size();
        // Create the Demandecle
        DemandecleDTO demandecleDTO = demandecleMapper.toDto(demandecle);
        restDemandecleMockMvc.perform(post("/api/demandecles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demandecleDTO)))
            .andExpect(status().isCreated());

        // Validate the Demandecle in the database
        List<Demandecle> demandecleList = demandecleRepository.findAll();
        assertThat(demandecleList).hasSize(databaseSizeBeforeCreate + 1);
        Demandecle testDemandecle = demandecleList.get(demandecleList.size() - 1);
        assertThat(testDemandecle.getNbreposte()).isEqualTo(DEFAULT_NBREPOSTE);
        assertThat(testDemandecle.getDureecle()).isEqualTo(DEFAULT_DUREECLE);
        assertThat(testDemandecle.getProductname()).isEqualTo(DEFAULT_PRODUCTNAME);
    }

    @Test
    @Transactional
    public void createDemandecleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demandecleRepository.findAll().size();

        // Create the Demandecle with an existing ID
        demandecle.setId(1L);
        DemandecleDTO demandecleDTO = demandecleMapper.toDto(demandecle);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemandecleMockMvc.perform(post("/api/demandecles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demandecleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Demandecle in the database
        List<Demandecle> demandecleList = demandecleRepository.findAll();
        assertThat(demandecleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDemandecles() throws Exception {
        // Initialize the database
        demandecleRepository.saveAndFlush(demandecle);

        // Get all the demandecleList
        restDemandecleMockMvc.perform(get("/api/demandecles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demandecle.getId().intValue())))
            .andExpect(jsonPath("$.[*].nbreposte").value(hasItem(DEFAULT_NBREPOSTE)))
            .andExpect(jsonPath("$.[*].dureecle").value(hasItem(DEFAULT_DUREECLE)))
            .andExpect(jsonPath("$.[*].productname").value(hasItem(DEFAULT_PRODUCTNAME)));
    }
    
    @Test
    @Transactional
    public void getDemandecle() throws Exception {
        // Initialize the database
        demandecleRepository.saveAndFlush(demandecle);

        // Get the demandecle
        restDemandecleMockMvc.perform(get("/api/demandecles/{id}", demandecle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(demandecle.getId().intValue()))
            .andExpect(jsonPath("$.nbreposte").value(DEFAULT_NBREPOSTE))
            .andExpect(jsonPath("$.dureecle").value(DEFAULT_DUREECLE))
            .andExpect(jsonPath("$.productname").value(DEFAULT_PRODUCTNAME));
    }
    @Test
    @Transactional
    public void getNonExistingDemandecle() throws Exception {
        // Get the demandecle
        restDemandecleMockMvc.perform(get("/api/demandecles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemandecle() throws Exception {
        // Initialize the database
        demandecleRepository.saveAndFlush(demandecle);

        int databaseSizeBeforeUpdate = demandecleRepository.findAll().size();

        // Update the demandecle
        Demandecle updatedDemandecle = demandecleRepository.findById(demandecle.getId()).get();
        // Disconnect from session so that the updates on updatedDemandecle are not directly saved in db
        em.detach(updatedDemandecle);
        updatedDemandecle
            .nbreposte(UPDATED_NBREPOSTE)
            .dureecle(UPDATED_DUREECLE)
            .productname(UPDATED_PRODUCTNAME);
        DemandecleDTO demandecleDTO = demandecleMapper.toDto(updatedDemandecle);

        restDemandecleMockMvc.perform(put("/api/demandecles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demandecleDTO)))
            .andExpect(status().isOk());

        // Validate the Demandecle in the database
        List<Demandecle> demandecleList = demandecleRepository.findAll();
        assertThat(demandecleList).hasSize(databaseSizeBeforeUpdate);
        Demandecle testDemandecle = demandecleList.get(demandecleList.size() - 1);
        assertThat(testDemandecle.getNbreposte()).isEqualTo(UPDATED_NBREPOSTE);
        assertThat(testDemandecle.getDureecle()).isEqualTo(UPDATED_DUREECLE);
        assertThat(testDemandecle.getProductname()).isEqualTo(UPDATED_PRODUCTNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDemandecle() throws Exception {
        int databaseSizeBeforeUpdate = demandecleRepository.findAll().size();

        // Create the Demandecle
        DemandecleDTO demandecleDTO = demandecleMapper.toDto(demandecle);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDemandecleMockMvc.perform(put("/api/demandecles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demandecleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Demandecle in the database
        List<Demandecle> demandecleList = demandecleRepository.findAll();
        assertThat(demandecleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDemandecle() throws Exception {
        // Initialize the database
        demandecleRepository.saveAndFlush(demandecle);

        int databaseSizeBeforeDelete = demandecleRepository.findAll().size();

        // Delete the demandecle
        restDemandecleMockMvc.perform(delete("/api/demandecles/{id}", demandecle.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Demandecle> demandecleList = demandecleRepository.findAll();
        assertThat(demandecleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
