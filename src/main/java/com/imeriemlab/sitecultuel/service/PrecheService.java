package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.service.dto.PrecheDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Preche.
 */
public interface PrecheService {

    /**
     * Save a preche.
     *
     * @param precheDTO the entity to save
     * @return the persisted entity
     */
    PrecheDTO save(PrecheDTO precheDTO);

    /**
     * Get all the preches.
     *
     * @return the list of entities
     */
    List<PrecheDTO> findAll();


    /**
     * Get the "id" preche.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PrecheDTO> findOne(Long id);

    /**
     * Delete the "id" preche.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
