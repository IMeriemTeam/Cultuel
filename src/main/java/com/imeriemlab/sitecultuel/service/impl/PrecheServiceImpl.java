package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.PrecheService;
import com.imeriemlab.sitecultuel.domain.Preche;
import com.imeriemlab.sitecultuel.repository.PrecheRepository;
import com.imeriemlab.sitecultuel.service.dto.PrecheDTO;
import com.imeriemlab.sitecultuel.service.mapper.PrecheMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Preche.
 */
@Service
@Transactional
public class PrecheServiceImpl implements PrecheService {

    private final Logger log = LoggerFactory.getLogger(PrecheServiceImpl.class);

    private final PrecheRepository precheRepository;

    private final PrecheMapper precheMapper;

    public PrecheServiceImpl(PrecheRepository precheRepository, PrecheMapper precheMapper) {
        this.precheRepository = precheRepository;
        this.precheMapper = precheMapper;
    }

    /**
     * Save a preche.
     *
     * @param precheDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PrecheDTO save(PrecheDTO precheDTO) {
        log.debug("Request to save Preche : {}", precheDTO);

        Preche preche = precheMapper.toEntity(precheDTO);
        preche = precheRepository.save(preche);
        return precheMapper.toDto(preche);
    }

    /**
     * Get all the preches.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PrecheDTO> findAll() {
        log.debug("Request to get all Preches");
        return precheRepository.findAll().stream()
            .map(precheMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one preche by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PrecheDTO> findOne(Long id) {
        log.debug("Request to get Preche : {}", id);
        return precheRepository.findById(id)
            .map(precheMapper::toDto);
    }

    /**
     * Delete the preche by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Preche : {}", id);
        precheRepository.deleteById(id);
    }
}
