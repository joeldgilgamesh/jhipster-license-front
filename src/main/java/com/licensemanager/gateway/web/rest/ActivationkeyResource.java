package com.licensemanager.gateway.web.rest;

import com.licensemanager.gateway.service.ActivationkeyService;
import com.licensemanager.gateway.web.rest.errors.BadRequestAlertException;
import com.licensemanager.gateway.service.dto.ActivationkeyDTO;

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
 * REST controller for managing {@link com.licensemanager.gateway.domain.Activationkey}.
 */
@RestController
@RequestMapping("/api")
public class ActivationkeyResource {

    private final Logger log = LoggerFactory.getLogger(ActivationkeyResource.class);

    private static final String ENTITY_NAME = "activationkey";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ActivationkeyService activationkeyService;

    public ActivationkeyResource(ActivationkeyService activationkeyService) {
        this.activationkeyService = activationkeyService;
    }

    /**
     * {@code POST  /activationkeys} : Create a new activationkey.
     *
     * @param activationkeyDTO the activationkeyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new activationkeyDTO, or with status {@code 400 (Bad Request)} if the activationkey has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/activationkeys")
    public ResponseEntity<ActivationkeyDTO> createActivationkey(@RequestBody ActivationkeyDTO activationkeyDTO) throws URISyntaxException {
        log.debug("REST request to save Activationkey : {}", activationkeyDTO);
        if (activationkeyDTO.getId() != null) {
            throw new BadRequestAlertException("A new activationkey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ActivationkeyDTO result = activationkeyService.save(activationkeyDTO);
        return ResponseEntity.created(new URI("/api/activationkeys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /activationkeys} : Updates an existing activationkey.
     *
     * @param activationkeyDTO the activationkeyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated activationkeyDTO,
     * or with status {@code 400 (Bad Request)} if the activationkeyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the activationkeyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/activationkeys")
    public ResponseEntity<ActivationkeyDTO> updateActivationkey(@RequestBody ActivationkeyDTO activationkeyDTO) throws URISyntaxException {
        log.debug("REST request to update Activationkey : {}", activationkeyDTO);
        if (activationkeyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ActivationkeyDTO result = activationkeyService.save(activationkeyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, activationkeyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /activationkeys} : get all the activationkeys.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of activationkeys in body.
     */
    @GetMapping("/activationkeys")
    public List<ActivationkeyDTO> getAllActivationkeys() {
        log.debug("REST request to get all Activationkeys");
        return activationkeyService.findAll();
    }

    /**
     * {@code GET  /activationkeys/:id} : get the "id" activationkey.
     *
     * @param id the id of the activationkeyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the activationkeyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/activationkeys/{id}")
    public ResponseEntity<ActivationkeyDTO> getActivationkey(@PathVariable Long id) {
        log.debug("REST request to get Activationkey : {}", id);
        Optional<ActivationkeyDTO> activationkeyDTO = activationkeyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(activationkeyDTO);
    }

    /**
     * {@code DELETE  /activationkeys/:id} : delete the "id" activationkey.
     *
     * @param id the id of the activationkeyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/activationkeys/{id}")
    public ResponseEntity<Void> deleteActivationkey(@PathVariable Long id) {
        log.debug("REST request to delete Activationkey : {}", id);

        activationkeyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
