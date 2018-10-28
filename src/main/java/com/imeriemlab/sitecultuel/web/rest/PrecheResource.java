package com.imeriemlab.sitecultuel.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.imeriemlab.sitecultuel.domain.Preche;
import com.imeriemlab.sitecultuel.service.PrecheService;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
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
     * @param preche the preche to create
     * @return the ResponseEntity with status 201 (Created) and with body the new preche, or with status 400 (Bad Request) if the preche has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/preches")
    @Timed
    public ResponseEntity<Preche> createPreche(@RequestBody Preche preche) throws URISyntaxException {
        log.debug("REST request to save Preche : {}", preche);
        if (preche.getId() != null) {
            throw new BadRequestAlertException("A new preche cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Preche result = precheService.save(preche);
        return ResponseEntity.created(new URI("/api/preches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /preches : Updates an existing preche.
     *
     * @param preche the preche to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated preche,
     * or with status 400 (Bad Request) if the preche is not valid,
     * or with status 500 (Internal Server Error) if the preche couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/preches")
    @Timed
    public ResponseEntity<Preche> updatePreche(@RequestBody Preche preche) throws URISyntaxException {
        log.debug("REST request to update Preche : {}", preche);
        if (preche.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Preche result = precheService.save(preche);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, preche.getId().toString()))
            .body(result);
    }

    /**
     * GET  /preches : get all the preches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of preches in body
     */
    @GetMapping("/preches")
    @Timed
    public List<Preche> getAllPreches() {
        log.debug("REST request to get all Preches");
        return precheService.findAll();
    }

    /**
     * GET  /preches/:id : get the "id" preche.
     *
     * @param id the id of the preche to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the preche, or with status 404 (Not Found)
     */
    @GetMapping("/preches/{id}")
    @Timed
    public ResponseEntity<Preche> getPreche(@PathVariable Long id) {
        log.debug("REST request to get Preche : {}", id);
        Optional<Preche> preche = precheService.findOne(id);
        return ResponseUtil.wrapOrNotFound(preche);
    }

    /**
     * DELETE  /preches/:id : delete the "id" preche.
     *
     * @param id the id of the preche to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/preches/{id}")
    @Timed
    public ResponseEntity<Void> deletePreche(@PathVariable Long id) {
        log.debug("REST request to delete Preche : {}", id);
        precheService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
