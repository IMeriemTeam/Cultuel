package com.imeriemlab.sitecultuel.service;

import com.imeriemlab.sitecultuel.service.dto.DonsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Dons.
 */
public interface DonsService {

    /**
     * Save a dons.
     *
     * @param donsDTO the entity to save
     * @return the persisted entity
     */
    DonsDTO save(DonsDTO donsDTO);

    /**
     * Get all the dons.
     *
     * @return the list of entities
     */
    List<DonsDTO> findAll();


    /**
     * Get the "id" dons.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DonsDTO> findOne(Long id);

    /**
     * Delete the "id" dons.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
