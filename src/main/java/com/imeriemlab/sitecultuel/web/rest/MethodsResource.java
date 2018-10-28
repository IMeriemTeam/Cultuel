package com.imeriemlab.sitecultuel.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.imeriemlab.sitecultuel.domain.Methods;
import com.imeriemlab.sitecultuel.service.MethodsService;
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
 * REST controller for managing Methods.
 */
@RestController
@RequestMapping("/api")
public class MethodsResource {

    private final Logger log = LoggerFactory.getLogger(MethodsResource.class);

    private static final String ENTITY_NAME = "methods";

    private final MethodsService methodsService;

    public MethodsResource(MethodsService methodsService) {
        this.methodsService = methodsService;
    }

    /**
     * POST  /methods : Create a new methods.
     *
     * @param methods the methods to create
     * @return the ResponseEntity with status 201 (Created) and with body the new methods, or with status 400 (Bad Request) if the methods has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/methods")
    @Timed
    public ResponseEntity<Methods> createMethods(@RequestBody Methods methods) throws URISyntaxException {
        log.debug("REST request to save Methods : {}", methods);
        if (methods.getId() != null) {
            throw new BadRequestAlertException("A new methods cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Methods result = methodsService.save(methods);
        return ResponseEntity.created(new URI("/api/methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /methods : Updates an existing methods.
     *
     * @param methods the methods to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated methods,
     * or with status 400 (Bad Request) if the methods is not valid,
     * or with status 500 (Internal Server Error) if the methods couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/methods")
    @Timed
    public ResponseEntity<Methods> updateMethods(@RequestBody Methods methods) throws URISyntaxException {
        log.debug("REST request to update Methods : {}", methods);
        if (methods.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Methods result = methodsService.save(methods);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, methods.getId().toString()))
            .body(result);
    }

    /**
     * GET  /methods : get all the methods.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of methods in body
     */
    @GetMapping("/methods")
    @Timed
    public List<Methods> getAllMethods() {
        log.debug("REST request to get all Methods");
        return methodsService.findAll();
    }

    /**
     * GET  /methods/:id : get the "id" methods.
     *
     * @param id the id of the methods to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the methods, or with status 404 (Not Found)
     */
    @GetMapping("/methods/{id}")
    @Timed
    public ResponseEntity<Methods> getMethods(@PathVariable Long id) {
        log.debug("REST request to get Methods : {}", id);
        Optional<Methods> methods = methodsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(methods);
    }

    /**
     * DELETE  /methods/:id : delete the "id" methods.
     *
     * @param id the id of the methods to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/methods/{id}")
    @Timed
    public ResponseEntity<Void> deleteMethods(@PathVariable Long id) {
        log.debug("REST request to delete Methods : {}", id);
        methodsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
