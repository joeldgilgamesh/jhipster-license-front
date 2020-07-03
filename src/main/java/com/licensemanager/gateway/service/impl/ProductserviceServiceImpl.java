package com.licensemanager.gateway.service.impl;

import com.licensemanager.gateway.service.ProductserviceService;
import com.licensemanager.gateway.domain.Productservice;
import com.licensemanager.gateway.repository.ProductserviceRepository;
import com.licensemanager.gateway.service.dto.ProductserviceDTO;
import com.licensemanager.gateway.service.mapper.ProductserviceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Productservice}.
 */
@Service
@Transactional
public class ProductserviceServiceImpl implements ProductserviceService {

    private final Logger log = LoggerFactory.getLogger(ProductserviceServiceImpl.class);

    private final ProductserviceRepository productserviceRepository;

    private final ProductserviceMapper productserviceMapper;

    public ProductserviceServiceImpl(ProductserviceRepository productserviceRepository, ProductserviceMapper productserviceMapper) {
        this.productserviceRepository = productserviceRepository;
        this.productserviceMapper = productserviceMapper;
    }

    /**
     * Save a productservice.
     *
     * @param productserviceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductserviceDTO save(ProductserviceDTO productserviceDTO) {
        log.debug("Request to save Productservice : {}", productserviceDTO);
        Productservice productservice = productserviceMapper.toEntity(productserviceDTO);
        productservice = productserviceRepository.save(productservice);
        return productserviceMapper.toDto(productservice);
    }

    /**
     * Get all the productservices.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductserviceDTO> findAll() {
        log.debug("Request to get all Productservices");
        return productserviceRepository.findAll().stream()
            .map(productserviceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one productservice by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductserviceDTO> findOne(Long id) {
        log.debug("Request to get Productservice : {}", id);
        return productserviceRepository.findById(id)
            .map(productserviceMapper::toDto);
    }

    /**
     * Delete the productservice by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Productservice : {}", id);

        productserviceRepository.deleteById(id);
    }
}
