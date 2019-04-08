package com.imeriemlab.sitecultuel.service.impl;

import com.imeriemlab.sitecultuel.service.DonsService;
import com.imeriemlab.sitecultuel.domain.Dons;
import com.imeriemlab.sitecultuel.repository.DonsRepository;
import com.imeriemlab.sitecultuel.service.dto.DonsDTO;
import com.imeriemlab.sitecultuel.service.mapper.DonsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Dons.
 */
@Service
@Transactional
public class DonsServiceImpl implements DonsService {

    private final Logger log = LoggerFactory.getLogger(DonsServiceImpl.class);

    private final DonsRepository donsRepository;

    private final DonsMapper donsMapper;

    public DonsServiceImpl(DonsRepository donsRepository, DonsMapper donsMapper) {
        this.donsRepository = donsRepository;
        this.donsMapper = donsMapper;
    }

    /**
     * Save a dons.
     *
     * @param donsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DonsDTO save(DonsDTO donsDTO) {
        log.debug("Request to save Dons : {}", donsDTO);
        Dons dons = donsMapper.toEntity(donsDTO);
        dons = donsRepository.save(dons);
        return donsMapper.toDto(dons);
    }

    /**
     * Get all the dons.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DonsDTO> findAll() {
        log.debug("Request to get all Dons");
        return donsRepository.findAll().stream()
            .map(donsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dons by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DonsDTO> findOne(Long id) {
        log.debug("Request to get Dons : {}", id);
        return donsRepository.findById(id)
            .map(donsMapper::toDto);
    }

    /**
     * Delete the dons by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dons : {}", id);
        donsRepository.deleteById(id);
    }
    
    
    
    /**
     * Get all don for the current user .
     *
     * @return the entity
     */
    @Override
	@Transactional(readOnly = true)
	public List<Dons> findByDonsUserIsCurrentUser() {
		log.debug("Request to get Dons by current User: {}");
		return donsRepository.findByDonsUserIsCurrentUser();
	}
}
