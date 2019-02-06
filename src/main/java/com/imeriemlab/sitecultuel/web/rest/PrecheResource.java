package com.imeriemlab.sitecultuel.web.rest;
import com.imeriemlab.sitecultuel.service.PrecheService;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
import com.imeriemlab.sitecultuel.service.dto.PrecheDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Preche.
 */
@RestController
@RequestMapping("/api")
public class PrecheResource {

    private final Logger log = LoggerFactory.getLogger(PrecheResource.class);

    private static final String ENTITY_NAME = "preche";

    private final PrecheService precheService;

    public PrecheResource(PrecheService precheService) {
        this.precheService = precheService;
    }

    /**
     * POST  /preches : Create a new preche.
     *
     * @param precheDTO the precheDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new precheDTO, or with status 400 (Bad Request) if the preche has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/preches")
    public ResponseEntity<PrecheDTO> createPreche(@RequestBody PrecheDTO precheDTO) throws URISyntaxException {
        log.debug("REST request to save Preche : {}", precheDTO);
        if (precheDTO.getId() != null) {
            throw new BadRequestAlertException("A new preche cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrecheDTO result = precheService.save(precheDTO);
        return ResponseEntity.created(new URI("/api/preches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /preches : Updates an existing preche.
     *
     * @param precheDTO the precheDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated precheDTO,
     * or with status 400 (Bad Request) if the precheDTO is not valid,
     * or with status 500 (Internal Server Error) if the precheDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/preches")
    public ResponseEntity<PrecheDTO> updatePreche(@RequestBody PrecheDTO precheDTO) throws URISyntaxException {
        log.debug("REST request to update Preche : {}", precheDTO);
        if (precheDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrecheDTO result = precheService.save(precheDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, precheDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /preches : get all the preches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of preches in body
     */
    @GetMapping("/preches")
    public List<PrecheDTO> getAllPreches() {
        log.debug("REST request to get all Preches");
        return precheService.findAll();
    }

    /**
     * GET  /preches/:id : get the "id" preche.
     *
     * @param id the id of the precheDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the precheDTO, or with status 404 (Not Found)
     */
    @GetMapping("/preches/{id}")
    public ResponseEntity<PrecheDTO> getPreche(@PathVariable Long id) {
        log.debug("REST request to get Preche : {}", id);
        Optional<PrecheDTO> precheDTO = precheService.findOne(id);
        return ResponseUtil.wrapOrNotFound(precheDTO);
    }

    /**
     * DELETE  /preches/:id : delete the "id" preche.
     *
     * @param id the id of the precheDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/preches/{id}")
    public ResponseEntity<Void> deletePreche(@PathVariable Long id) {
        log.debug("REST request to delete Preche : {}", id);
        precheService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
