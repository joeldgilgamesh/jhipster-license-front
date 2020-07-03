package com.licensemanager.gateway.service.impl;

import com.licensemanager.gateway.service.DemandecleService;
import com.licensemanager.gateway.domain.Demandecle;
import com.licensemanager.gateway.repository.DemandecleRepository;
import com.licensemanager.gateway.service.dto.DemandecleDTO;
import com.licensemanager.gateway.service.mapper.DemandecleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Demandecle}.
 */
@Service
@Transactional
public class DemandecleServiceImpl implements DemandecleService {

    private final Logger log = LoggerFactory.getLogger(DemandecleServiceImpl.class);

    private final DemandecleRepository demandecleRepository;

    private final DemandecleMapper demandecleMapper;

    public DemandecleServiceImpl(DemandecleRepository demandecleRepository, DemandecleMapper demandecleMapper) {
        this.demandecleRepository = demandecleRepository;
        this.demandecleMapper = demandecleMapper;
    }

    /**
     * Save a demandecle.
     *
     * @param demandecleDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DemandecleDTO save(DemandecleDTO demandecleDTO) {
        log.debug("Request to save Demandecle : {}", demandecleDTO);
        Demandecle demandecle = demandecleMapper.toEntity(demandecleDTO);
        demandecle = demandecleRepository.save(demandecle);
        return demandecleMapper.toDto(demandecle);
    }

    /**
     * Get all the demandecles.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DemandecleDTO> findAll() {
        log.debug("Request to get all Demandecles");
        return demandecleRepository.findAll().stream()
            .map(demandecleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one demandecle by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DemandecleDTO> findOne(Long id) {
        log.debug("Request to get Demandecle : {}", id);
        return demandecleRepository.findById(id)
            .map(demandecleMapper::toDto);
    }

    /**
     * Delete the demandecle by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Demandecle : {}", id);

        demandecleRepository.deleteById(id);
    }
}
