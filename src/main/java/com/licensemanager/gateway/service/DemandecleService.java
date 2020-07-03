package com.licensemanager.gateway.service;

import com.licensemanager.gateway.service.dto.DemandecleDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.licensemanager.gateway.domain.Demandecle}.
 */
public interface DemandecleService {

    /**
     * Save a demandecle.
     *
     * @param demandecleDTO the entity to save.
     * @return the persisted entity.
     */
    DemandecleDTO save(DemandecleDTO demandecleDTO);

    /**
     * Get all the demandecles.
     *
     * @return the list of entities.
     */
    List<DemandecleDTO> findAll();


    /**
     * Get the "id" demandecle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DemandecleDTO> findOne(Long id);

    /**
     * Delete the "id" demandecle.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
