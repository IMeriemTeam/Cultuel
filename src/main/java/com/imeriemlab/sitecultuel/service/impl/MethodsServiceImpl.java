package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.MethodsService;
import com.imeriemlab.sitecultuel.domain.Methods;
import com.imeriemlab.sitecultuel.repository.MethodsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Methods.
 */
@Service
@Transactional
public class MethodsServiceImpl implements MethodsService {

    private final Logger log = LoggerFactory.getLogger(MethodsServiceImpl.class);

    private final MethodsRepository methodsRepository;

    public MethodsServiceImpl(MethodsRepository methodsRepository) {
        this.methodsRepository = methodsRepository;
    }

    /**
     * Save a methods.
     *
     * @param methods the entity to save
     * @return the persisted entity
     */
    @Override
    public Methods save(Methods methods) {
        log.debug("Request to save Methods : {}", methods);
        return methodsRepository.save(methods);
    }

    /**
     * Get all the methods.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Methods> findAll() {
        log.debug("Request to get all Methods");
        return methodsRepository.findAll();
    }


    /**
     * Get one methods by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Methods> findOne(Long id) {
        log.debug("Request to get Methods : {}", id);
        return methodsRepository.findById(id);
    }

    /**
     * Delete the methods by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Methods : {}", id);
        methodsRepository.deleteById(id);
    }
}
