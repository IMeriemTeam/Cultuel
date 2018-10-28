package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.PrayerService;
import com.imeriemlab.sitecultuel.domain.Prayer;
import com.imeriemlab.sitecultuel.repository.PrayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Prayer.
 */
@Service
@Transactional
public class PrayerServiceImpl implements PrayerService {

    private final Logger log = LoggerFactory.getLogger(PrayerServiceImpl.class);

    private final PrayerRepository prayerRepository;

    public PrayerServiceImpl(PrayerRepository prayerRepository) {
        this.prayerRepository = prayerRepository;
    }

    /**
     * Save a prayer.
     *
     * @param prayer the entity to save
     * @return the persisted entity
     */
    @Override
    public Prayer save(Prayer prayer) {
        log.debug("Request to save Prayer : {}", prayer);
        return prayerRepository.save(prayer);
    }

    /**
     * Get all the prayers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Prayer> findAll() {
        log.debug("Request to get all Prayers");
        return prayerRepository.findAll();
    }


    /**
     * Get one prayer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Prayer> findOne(Long id) {
        log.debug("Request to get Prayer : {}", id);
        return prayerRepository.findById(id);
    }

    /**
     * Delete the prayer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Prayer : {}", id);
        prayerRepository.deleteById(id);
    }
}
