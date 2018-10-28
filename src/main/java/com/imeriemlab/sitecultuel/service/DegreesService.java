package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.domain.Degrees;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Degrees.
 */
public interface DegreesService {

    /**
     * Save a degrees.
     *
     * @param degrees the entity to save
     * @return the persisted entity
     */
    Degrees save(Degrees degrees);

    /**
     * Get all the degrees.
     *
     * @return the list of entities
     */
    List<Degrees> findAll();


    /**
     * Get the "id" degrees.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Degrees> findOne(Long id);

    /**
     * Delete the "id" degrees.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
