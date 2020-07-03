package com.licensemanager.gateway.service;

import com.licensemanager.gateway.service.dto.ActivationkeyDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.licensemanager.gateway.domain.Activationkey}.
 */
public interface ActivationkeyService {

    /**
     * Save a activationkey.
     *
     * @param activationkeyDTO the entity to save.
     * @return the persisted entity.
     */
    ActivationkeyDTO save(ActivationkeyDTO activationkeyDTO);

    /**
     * Get all the activationkeys.
     *
     * @return the list of entities.
     */
    List<ActivationkeyDTO> findAll();


    /**
     * Get the "id" activationkey.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ActivationkeyDTO> findOne(Long id);

    /**
     * Delete the "id" activationkey.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
