package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.domain.Preche;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Preche.
 */
public interface PrecheService {

    /**
     * Save a preche.
     *
     * @param preche the entity to save
     * @return the persisted entity
     */
    Preche save(Preche preche);

    /**
     * Get all the preches.
     *
     * @return the list of entities
     */
    List<Preche> findAll();


    /**
     * Get the "id" preche.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Preche> findOne(Long id);

    /**
     * Delete the "id" preche.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
