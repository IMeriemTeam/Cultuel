package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.CultuelApp;

import com.imeriemlab.sitecultuel.domain.Articles;
import com.imeriemlab.sitecultuel.repository.ArticlesRepository;
import com.imeriemlab.sitecultuel.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.imeriemlab.sitecultuel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ArticlesResource REST controller.
 *
 * @see ArticlesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CultuelApp.class)
public class ArticlesResourceIntTest {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private ArticlesRepository articlesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restArticlesMockMvc;

    private Articles articles;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticlesResource articlesResource = new ArticlesResource(articlesRepository);
        this.restArticlesMockMvc = MockMvcBuilders.standaloneSetup(articlesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Articles createEntity(EntityManager em) {
        Articles articles = new Articles()
            .titre(DEFAULT_TITRE)
            .date(DEFAULT_DATE)
            .message(DEFAULT_MESSAGE);
        return articles;
    }

    @Before
    public void initTest() {
        articles = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticles() throws Exception {
        int databaseSizeBeforeCreate = articlesRepository.findAll().size();

        // Create the Articles
        restArticlesMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articles)))
            .andExpect(status().isCreated());

        // Validate the Articles in the database
        List<Articles> articlesList = articlesRepository.findAll();
        assertThat(articlesList).hasSize(databaseSizeBeforeCreate + 1);
        Articles testArticles = articlesList.get(articlesList.size() - 1);
        assertThat(testArticles.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testArticles.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testArticles.getMessage()).isEqualTo(DEFAULT_MESSAGE);
    }

    @Test
    @Transactional
    public void createArticlesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articlesRepository.findAll().size();

        // Create the Articles with an existing ID
        articles.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticlesMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articles)))
            .andExpect(status().isBadRequest());

        // Validate the Articles in the database
        List<Articles> articlesList = articlesRepository.findAll();
        assertThat(articlesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArticles() throws Exception {
        // Initialize the database
        articlesRepository.saveAndFlush(articles);

        // Get all the articlesList
        restArticlesMockMvc.perform(get("/api/articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articles.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getArticles() throws Exception {
        // Initialize the database
        articlesRepository.saveAndFlush(articles);

        // Get the articles
        restArticlesMockMvc.perform(get("/api/articles/{id}", articles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articles.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArticles() throws Exception {
        // Get the articles
        restArticlesMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticles() throws Exception {
        // Initialize the database
        articlesRepository.saveAndFlush(articles);

        int databaseSizeBeforeUpdate = articlesRepository.findAll().size();

        // Update the articles
        Articles updatedArticles = articlesRepository.findById(articles.getId()).get();
        // Disconnect from session so that the updates on updatedArticles are not directly saved in db
        em.detach(updatedArticles);
        updatedArticles
            .titre(UPDATED_TITRE)
            .date(UPDATED_DATE)
            .message(UPDATED_MESSAGE);

        restArticlesMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticles)))
            .andExpect(status().isOk());

        // Validate the Articles in the database
        List<Articles> articlesList = articlesRepository.findAll();
        assertThat(articlesList).hasSize(databaseSizeBeforeUpdate);
        Articles testArticles = articlesList.get(articlesList.size() - 1);
        assertThat(testArticles.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testArticles.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testArticles.getMessage()).isEqualTo(UPDATED_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticles() throws Exception {
        int databaseSizeBeforeUpdate = articlesRepository.findAll().size();

        // Create the Articles

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticlesMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articles)))
            .andExpect(status().isBadRequest());

        // Validate the Articles in the database
        List<Articles> articlesList = articlesRepository.findAll();
        assertThat(articlesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticles() throws Exception {
        // Initialize the database
        articlesRepository.saveAndFlush(articles);

        int databaseSizeBeforeDelete = articlesRepository.findAll().size();

        // Delete the articles
        restArticlesMockMvc.perform(delete("/api/articles/{id}", articles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Articles> articlesList = articlesRepository.findAll();
        assertThat(articlesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Articles.class);
        Articles articles1 = new Articles();
        articles1.setId(1L);
        Articles articles2 = new Articles();
        articles2.setId(articles1.getId());
        assertThat(articles1).isEqualTo(articles2);
        articles2.setId(2L);
        assertThat(articles1).isNotEqualTo(articles2);
        articles1.setId(null);
        assertThat(articles1).isNotEqualTo(articles2);
    }
}
