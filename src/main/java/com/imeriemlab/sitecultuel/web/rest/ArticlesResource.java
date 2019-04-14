package com.imeriemlab.sitecultuel.web.rest;
import com.imeriemlab.sitecultuel.domain.Articles;
import com.imeriemlab.sitecultuel.repository.ArticlesRepository;
import com.imeriemlab.sitecultuel.web.rest.errors.BadRequestAlertException;
import com.imeriemlab.sitecultuel.web.rest.util.HeaderUtil;
import com.imeriemlab.sitecultuel.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Articles.
 */
@RestController
@RequestMapping("/api")
public class ArticlesResource {

    private final Logger log = LoggerFactory.getLogger(ArticlesResource.class);

    private static final String ENTITY_NAME = "articles";

    private final ArticlesRepository articlesRepository;

    public ArticlesResource(ArticlesRepository articlesRepository) {
        this.articlesRepository = articlesRepository;
    }

    /**
     * POST  /articles : Create a new articles.
     *
     * @param articles the articles to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articles, or with status 400 (Bad Request) if the articles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/articles")
    public ResponseEntity<Articles> createArticles(@RequestBody Articles articles) throws URISyntaxException {
        log.debug("REST request to save Articles : {}", articles);
        if (articles.getId() != null) {
            throw new BadRequestAlertException("A new articles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Articles result = articlesRepository.save(articles);
        return ResponseEntity.created(new URI("/api/articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /articles : Updates an existing articles.
     *
     * @param articles the articles to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articles,
     * or with status 400 (Bad Request) if the articles is not valid,
     * or with status 500 (Internal Server Error) if the articles couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/articles")
    public ResponseEntity<Articles> updateArticles(@RequestBody Articles articles) throws URISyntaxException {
        log.debug("REST request to update Articles : {}", articles);
        if (articles.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Articles result = articlesRepository.save(articles);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articles.getId().toString()))
            .body(result);
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles")
    public ResponseEntity<List<Articles>> getAllArticles(Pageable pageable) {
        log.debug("REST request to get a page of Articles");
        Page<Articles> page = articlesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/articles");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /articles/:id : get the "id" articles.
     *
     * @param id the id of the articles to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articles, or with status 404 (Not Found)
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity<Articles> getArticles(@PathVariable Long id) {
        log.debug("REST request to get Articles : {}", id);
        Optional<Articles> articles = articlesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articles);
    }

    /**
     * DELETE  /articles/:id : delete the "id" articles.
     *
     * @param id the id of the articles to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticles(@PathVariable Long id) {
        log.debug("REST request to delete Articles : {}", id);
        articlesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
