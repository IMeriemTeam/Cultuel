package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.PrecheService;
import com.imeriemlab.sitecultuel.domain.Preche;
import com.imeriemlab.sitecultuel.repository.PrecheRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Preche.
 */
@Service
@Transactional
public class PrecheServiceImpl implements PrecheService {

    private final Logger log = LoggerFactory.getLogger(PrecheServiceImpl.class);

    private final PrecheRepository precheRepository;

    public PrecheServiceImpl(PrecheRepository precheRepository) {
        this.precheRepository = precheRepository;
    }

    /**
     * Save a preche.
     *
     * @param preche the entity to save
     * @return the persisted entity
     */
    @Override
    public Preche save(Preche preche) {
        log.debug("Request to save Preche : {}", preche);
        return precheRepository.save(preche);
    }

    /**
     * Get all the preches.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Preche> findAll() {
        log.debug("Request to get all Preches");
        return precheRepository.findAll();
    }


    /**
     * Get one preche by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Preche> findOne(Long id) {
        log.debug("Request to get Preche : {}", id);
        return precheRepository.findById(id);
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
