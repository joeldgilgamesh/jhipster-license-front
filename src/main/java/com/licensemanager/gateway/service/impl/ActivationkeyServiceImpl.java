package com.licensemanager.gateway.service.impl;

import com.licensemanager.gateway.service.ActivationkeyService;
import com.licensemanager.gateway.domain.Activationkey;
import com.licensemanager.gateway.repository.ActivationkeyRepository;
import com.licensemanager.gateway.service.dto.ActivationkeyDTO;
import com.licensemanager.gateway.service.mapper.ActivationkeyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Activationkey}.
 */
@Service
@Transactional
public class ActivationkeyServiceImpl implements ActivationkeyService {

    private final Logger log = LoggerFactory.getLogger(ActivationkeyServiceImpl.class);

    private final ActivationkeyRepository activationkeyRepository;

    private final ActivationkeyMapper activationkeyMapper;

    public ActivationkeyServiceImpl(ActivationkeyRepository activationkeyRepository, ActivationkeyMapper activationkeyMapper) {
        this.activationkeyRepository = activationkeyRepository;
        this.activationkeyMapper = activationkeyMapper;
    }

    /**
     * Save a activationkey.
     *
     * @param activationkeyDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ActivationkeyDTO save(ActivationkeyDTO activationkeyDTO) {
        log.debug("Request to save Activationkey : {}", activationkeyDTO);
        Activationkey activationkey = activationkeyMapper.toEntity(activationkeyDTO);
        activationkey = activationkeyRepository.save(activationkey);
        return activationkeyMapper.toDto(activationkey);
    }

    /**
     * Get all the activationkeys.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ActivationkeyDTO> findAll() {
        log.debug("Request to get all Activationkeys");
        return activationkeyRepository.findAll().stream()
            .map(activationkeyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one activationkey by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ActivationkeyDTO> findOne(Long id) {
        log.debug("Request to get Activationkey : {}", id);
        return activationkeyRepository.findById(id)
            .map(activationkeyMapper::toDto);
    }

    /**
     * Delete the activationkey by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Activationkey : {}", id);

        activationkeyRepository.deleteById(id);
    }
}
