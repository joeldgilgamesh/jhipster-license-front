package com.licensemanager.gateway.web.rest;

import com.licensemanager.gateway.service.DemandecleService;
import com.licensemanager.gateway.web.rest.errors.BadRequestAlertException;
import com.licensemanager.gateway.service.dto.DemandecleDTO;

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
 * REST controller for managing {@link com.licensemanager.gateway.domain.Demandecle}.
 */
@RestController
@RequestMapping("/api")
public class DemandecleResource {

    private final Logger log = LoggerFactory.getLogger(DemandecleResource.class);

    private static final String ENTITY_NAME = "demandecle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DemandecleService demandecleService;

    public DemandecleResource(DemandecleService demandecleService) {
        this.demandecleService = demandecleService;
    }

    /**
     * {@code POST  /demandecles} : Create a new demandecle.
     *
     * @param demandecleDTO the demandecleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new demandecleDTO, or with status {@code 400 (Bad Request)} if the demandecle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/demandecles")
    public ResponseEntity<DemandecleDTO> createDemandecle(@RequestBody DemandecleDTO demandecleDTO) throws URISyntaxException {
        log.debug("REST request to save Demandecle : {}", demandecleDTO);
        if (demandecleDTO.getId() != null) {
            throw new BadRequestAlertException("A new demandecle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemandecleDTO result = demandecleService.save(demandecleDTO);
        return ResponseEntity.created(new URI("/api/demandecles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /demandecles} : Updates an existing demandecle.
     *
     * @param demandecleDTO the demandecleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated demandecleDTO,
     * or with status {@code 400 (Bad Request)} if the demandecleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the demandecleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/demandecles")
    public ResponseEntity<DemandecleDTO> updateDemandecle(@RequestBody DemandecleDTO demandecleDTO) throws URISyntaxException {
        log.debug("REST request to update Demandecle : {}", demandecleDTO);
        if (demandecleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DemandecleDTO result = demandecleService.save(demandecleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, demandecleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /demandecles} : get all the demandecles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of demandecles in body.
     */
    @GetMapping("/demandecles")
    public List<DemandecleDTO> getAllDemandecles() {
        log.debug("REST request to get all Demandecles");
        return demandecleService.findAll();
    }

    /**
     * {@code GET  /demandecles/:id} : get the "id" demandecle.
     *
     * @param id the id of the demandecleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the demandecleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/demandecles/{id}")
    public ResponseEntity<DemandecleDTO> getDemandecle(@PathVariable Long id) {
        log.debug("REST request to get Demandecle : {}", id);
        Optional<DemandecleDTO> demandecleDTO = demandecleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(demandecleDTO);
    }

    /**
     * {@code DELETE  /demandecles/:id} : delete the "id" demandecle.
     *
     * @param id the id of the demandecleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/demandecles/{id}")
    public ResponseEntity<Void> deleteDemandecle(@PathVariable Long id) {
        log.debug("REST request to delete Demandecle : {}", id);

        demandecleService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
