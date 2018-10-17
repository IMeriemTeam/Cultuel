package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.domain.Prayer;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Prayer.
 */
public interface PrayerService {

    /**
     * Save a prayer.
     *
     * @param prayer the entity to save
     * @return the persisted entity
     */
    Prayer save(Prayer prayer);

    /**
     * Get all the prayers.
     *
     * @return the list of entities
     */
    List<Prayer> findAll();


    /**
     * Get the "id" prayer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Prayer> findOne(Long id);

    /**
     * Delete the "id" prayer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
