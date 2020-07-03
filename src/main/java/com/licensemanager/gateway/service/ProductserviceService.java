package com.licensemanager.gateway.service;

import com.licensemanager.gateway.service.dto.ProductserviceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.licensemanager.gateway.domain.Productservice}.
 */
public interface ProductserviceService {

    /**
     * Save a productservice.
     *
     * @param productserviceDTO the entity to save.
     * @return the persisted entity.
     */
    ProductserviceDTO save(ProductserviceDTO productserviceDTO);

    /**
     * Get all the productservices.
     *
     * @return the list of entities.
     */
    List<ProductserviceDTO> findAll();


    /**
     * Get the "id" productservice.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductserviceDTO> findOne(Long id);

    /**
     * Delete the "id" productservice.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
