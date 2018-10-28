package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.DegreesService;
import com.imeriemlab.sitecultuel.domain.Degrees;
import com.imeriemlab.sitecultuel.repository.DegreesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Degrees.
 */
@Service
@Transactional
public class DegreesServiceImpl implements DegreesService {

    private final Logger log = LoggerFactory.getLogger(DegreesServiceImpl.class);

    private final DegreesRepository degreesRepository;

    public DegreesServiceImpl(DegreesRepository degreesRepository) {
        this.degreesRepository = degreesRepository;
    }

    /**
     * Save a degrees.
     *
     * @param degrees the entity to save
     * @return the persisted entity
     */
    @Override
    public Degrees save(Degrees degrees) {
        log.debug("Request to save Degrees : {}", degrees);
        return degreesRepository.save(degrees);
    }

    /**
     * Get all the degrees.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Degrees> findAll() {
        log.debug("Request to get all Degrees");
        return degreesRepository.findAll();
    }


    /**
     * Get one degrees by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Degrees> findOne(Long id) {
        log.debug("Request to get Degrees : {}", id);
        return degreesRepository.findById(id);
    }

    /**
     * Delete the degrees by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Degrees : {}", id);
        degreesRepository.deleteById(id);
    }
}
