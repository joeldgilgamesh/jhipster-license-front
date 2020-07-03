package com.licensemanager.gateway.web.rest;

import com.licensemanager.gateway.GatewayApp;
import com.licensemanager.gateway.domain.Productservice;
import com.licensemanager.gateway.repository.ProductserviceRepository;
import com.licensemanager.gateway.service.ProductserviceService;
import com.licensemanager.gateway.service.dto.ProductserviceDTO;
import com.licensemanager.gateway.service.mapper.ProductserviceMapper;

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
 * Integration tests for the {@link ProductserviceResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProductserviceResourceIT {

    private static final String DEFAULT_PRODUCTNAME = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODEPRODUCT = "AAAAAAAAAA";
    private static final String UPDATED_CODEPRODUCT = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    @Autowired
    private ProductserviceRepository productserviceRepository;

    @Autowired
    private ProductserviceMapper productserviceMapper;

    @Autowired
    private ProductserviceService productserviceService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductserviceMockMvc;

    private Productservice productservice;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productservice createEntity(EntityManager em) {
        Productservice productservice = new Productservice()
            .productname(DEFAULT_PRODUCTNAME)
            .codeproduct(DEFAULT_CODEPRODUCT)
            .version(DEFAULT_VERSION);
        return productservice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productservice createUpdatedEntity(EntityManager em) {
        Productservice productservice = new Productservice()
            .productname(UPDATED_PRODUCTNAME)
            .codeproduct(UPDATED_CODEPRODUCT)
            .version(UPDATED_VERSION);
        return productservice;
    }

    @BeforeEach
    public void initTest() {
        productservice = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductservice() throws Exception {
        int databaseSizeBeforeCreate = productserviceRepository.findAll().size();
        // Create the Productservice
        ProductserviceDTO productserviceDTO = productserviceMapper.toDto(productservice);
        restProductserviceMockMvc.perform(post("/api/productservices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productserviceDTO)))
            .andExpect(status().isCreated());

        // Validate the Productservice in the database
        List<Productservice> productserviceList = productserviceRepository.findAll();
        assertThat(productserviceList).hasSize(databaseSizeBeforeCreate + 1);
        Productservice testProductservice = productserviceList.get(productserviceList.size() - 1);
        assertThat(testProductservice.getProductname()).isEqualTo(DEFAULT_PRODUCTNAME);
        assertThat(testProductservice.getCodeproduct()).isEqualTo(DEFAULT_CODEPRODUCT);
        assertThat(testProductservice.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createProductserviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productserviceRepository.findAll().size();

        // Create the Productservice with an existing ID
        productservice.setId(1L);
        ProductserviceDTO productserviceDTO = productserviceMapper.toDto(productservice);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductserviceMockMvc.perform(post("/api/productservices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productserviceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Productservice in the database
        List<Productservice> productserviceList = productserviceRepository.findAll();
        assertThat(productserviceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProductservices() throws Exception {
        // Initialize the database
        productserviceRepository.saveAndFlush(productservice);

        // Get all the productserviceList
        restProductserviceMockMvc.perform(get("/api/productservices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productservice.getId().intValue())))
            .andExpect(jsonPath("$.[*].productname").value(hasItem(DEFAULT_PRODUCTNAME)))
            .andExpect(jsonPath("$.[*].codeproduct").value(hasItem(DEFAULT_CODEPRODUCT)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));
    }
    
    @Test
    @Transactional
    public void getProductservice() throws Exception {
        // Initialize the database
        productserviceRepository.saveAndFlush(productservice);

        // Get the productservice
        restProductserviceMockMvc.perform(get("/api/productservices/{id}", productservice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productservice.getId().intValue()))
            .andExpect(jsonPath("$.productname").value(DEFAULT_PRODUCTNAME))
            .andExpect(jsonPath("$.codeproduct").value(DEFAULT_CODEPRODUCT))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION));
    }
    @Test
    @Transactional
    public void getNonExistingProductservice() throws Exception {
        // Get the productservice
        restProductserviceMockMvc.perform(get("/api/productservices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductservice() throws Exception {
        // Initialize the database
        productserviceRepository.saveAndFlush(productservice);

        int databaseSizeBeforeUpdate = productserviceRepository.findAll().size();

        // Update the productservice
        Productservice updatedProductservice = productserviceRepository.findById(productservice.getId()).get();
        // Disconnect from session so that the updates on updatedProductservice are not directly saved in db
        em.detach(updatedProductservice);
        updatedProductservice
            .productname(UPDATED_PRODUCTNAME)
            .codeproduct(UPDATED_CODEPRODUCT)
            .version(UPDATED_VERSION);
        ProductserviceDTO productserviceDTO = productserviceMapper.toDto(updatedProductservice);

        restProductserviceMockMvc.perform(put("/api/productservices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productserviceDTO)))
            .andExpect(status().isOk());

        // Validate the Productservice in the database
        List<Productservice> productserviceList = productserviceRepository.findAll();
        assertThat(productserviceList).hasSize(databaseSizeBeforeUpdate);
        Productservice testProductservice = productserviceList.get(productserviceList.size() - 1);
        assertThat(testProductservice.getProductname()).isEqualTo(UPDATED_PRODUCTNAME);
        assertThat(testProductservice.getCodeproduct()).isEqualTo(UPDATED_CODEPRODUCT);
        assertThat(testProductservice.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingProductservice() throws Exception {
        int databaseSizeBeforeUpdate = productserviceRepository.findAll().size();

        // Create the Productservice
        ProductserviceDTO productserviceDTO = productserviceMapper.toDto(productservice);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductserviceMockMvc.perform(put("/api/productservices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productserviceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Productservice in the database
        List<Productservice> productserviceList = productserviceRepository.findAll();
        assertThat(productserviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductservice() throws Exception {
        // Initialize the database
        productserviceRepository.saveAndFlush(productservice);

        int databaseSizeBeforeDelete = productserviceRepository.findAll().size();

        // Delete the productservice
        restProductserviceMockMvc.perform(delete("/api/productservices/{id}", productservice.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productservice> productserviceList = productserviceRepository.findAll();
        assertThat(productserviceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
