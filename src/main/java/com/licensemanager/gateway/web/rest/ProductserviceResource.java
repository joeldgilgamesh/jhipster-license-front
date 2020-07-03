package com.licensemanager.gateway.web.rest;

import com.licensemanager.gateway.service.ProductserviceService;
import com.licensemanager.gateway.web.rest.errors.BadRequestAlertException;
import com.licensemanager.gateway.service.dto.ProductserviceDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.licensemanager.gateway.domain.Productservice}.
 */
@RestController
@RequestMapping("/api")
public class ProductserviceResource {

    private final Logger log = LoggerFactory.getLogger(ProductserviceResource.class);

    private static final String ENTITY_NAME = "productservice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductserviceService productserviceService;

    public ProductserviceResource(ProductserviceService productserviceService) {
        this.productserviceService = productserviceService;
    }

    /**
     * {@code POST  /productservices} : Create a new productservice.
     *
     * @param productserviceDTO the productserviceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productserviceDTO, or with status {@code 400 (Bad Request)} if the productservice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productservices")
    public ResponseEntity<ProductserviceDTO> createProductservice(@RequestBody ProductserviceDTO productserviceDTO) throws URISyntaxException {
        log.debug("REST request to save Productservice : {}", productserviceDTO);
        if (productserviceDTO.getId() != null) {
            throw new BadRequestAlertException("A new productservice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductserviceDTO result = productserviceService.save(productserviceDTO);
        return ResponseEntity.created(new URI("/api/productservices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productservices} : Updates an existing productservice.
     *
     * @param productserviceDTO the productserviceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productserviceDTO,
     * or with status {@code 400 (Bad Request)} if the productserviceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productserviceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productservices")
    public ResponseEntity<ProductserviceDTO> updateProductservice(@RequestBody ProductserviceDTO productserviceDTO) throws URISyntaxException {
        log.debug("REST request to update Productservice : {}", productserviceDTO);
        if (productserviceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductserviceDTO result = productserviceService.save(productserviceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, productserviceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productservices} : get all the productservices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productservices in body.
     */
    @GetMapping("/productservices")
    public List<ProductserviceDTO> getAllProductservices() {
        log.debug("REST request to get all Productservices");
        return productserviceService.findAll();
    }

    /**
     * {@code GET  /productservices/:id} : get the "id" productservice.
     *
     * @param id the id of the productserviceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productserviceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productservices/{id}")
    public ResponseEntity<ProductserviceDTO> getProductservice(@PathVariable Long id) {
        log.debug("REST request to get Productservice : {}", id);
        Optional<ProductserviceDTO> productserviceDTO = productserviceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productserviceDTO);
    }

    /**
     * {@code DELETE  /productservices/:id} : delete the "id" productservice.
     *
     * @param id the id of the productserviceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productservices/{id}")
    public ResponseEntity<Void> deleteProductservice(@PathVariable Long id) {
        log.debug("REST request to delete Productservice : {}", id);

        productserviceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
