package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.domain.Methods;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Methods.
 */
public interface MethodsService {

    /**
     * Save a methods.
     *
     * @param methods the entity to save
     * @return the persisted entity
     */
    Methods save(Methods methods);

    /**
     * Get all the methods.
     *
     * @return the list of entities
     */
    List<Methods> findAll();


    /**
     * Get the "id" methods.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Methods> findOne(Long id);

    /**
     * Delete the "id" methods.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
