package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.CultuelApp;

import com.imeriemlab.sitecultuel.domain.Preche;
import com.imeriemlab.sitecultuel.repository.PrecheRepository;
import com.imeriemlab.sitecultuel.service.PrecheService;
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
 * Test class for the PrecheResource REST controller.
 *
 * @see PrecheResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CultuelApp.class)
public class PrecheResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_IMAM = "AAAAAAAAAA";
    private static final String UPDATED_IMAM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PrecheRepository precheRepository;
    
    @Autowired
    private PrecheService precheService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrecheMockMvc;

    private Preche preche;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrecheResource precheResource = new PrecheResource(precheService);
        this.restPrecheMockMvc = MockMvcBuilders.standaloneSetup(precheResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Preche createEntity(EntityManager em) {
        Preche preche = new Preche()
            .title(DEFAULT_TITLE)
            .imam(DEFAULT_IMAM)
            .date(DEFAULT_DATE);
        return preche;
    }

    @Before
    public void initTest() {
        preche = createEntity(em);
    }

    @Test
    @Transactional
    public void createPreche() throws Exception {
        int databaseSizeBeforeCreate = precheRepository.findAll().size();

        // Create the Preche
        restPrecheMockMvc.perform(post("/api/preches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preche)))
            .andExpect(status().isCreated());

        // Validate the Preche in the database
        List<Preche> precheList = precheRepository.findAll();
        assertThat(precheList).hasSize(databaseSizeBeforeCreate + 1);
        Preche testPreche = precheList.get(precheList.size() - 1);
        assertThat(testPreche.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPreche.getImam()).isEqualTo(DEFAULT_IMAM);
        assertThat(testPreche.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createPrecheWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = precheRepository.findAll().size();

        // Create the Preche with an existing ID
        preche.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrecheMockMvc.perform(post("/api/preches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preche)))
            .andExpect(status().isBadRequest());

        // Validate the Preche in the database
        List<Preche> precheList = precheRepository.findAll();
        assertThat(precheList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPreches() throws Exception {
        // Initialize the database
        precheRepository.saveAndFlush(preche);

        // Get all the precheList
        restPrecheMockMvc.perform(get("/api/preches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(preche.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].imam").value(hasItem(DEFAULT_IMAM.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPreche() throws Exception {
        // Initialize the database
        precheRepository.saveAndFlush(preche);

        // Get the preche
        restPrecheMockMvc.perform(get("/api/preches/{id}", preche.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(preche.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.imam").value(DEFAULT_IMAM.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPreche() throws Exception {
        // Get the preche
        restPrecheMockMvc.perform(get("/api/preches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePreche() throws Exception {
        // Initialize the database
        precheService.save(preche);

        int databaseSizeBeforeUpdate = precheRepository.findAll().size();

        // Update the preche
        Preche updatedPreche = precheRepository.findById(preche.getId()).get();
        // Disconnect from session so that the updates on updatedPreche are not directly saved in db
        em.detach(updatedPreche);
        updatedPreche
            .title(UPDATED_TITLE)
            .imam(UPDATED_IMAM)
            .date(UPDATED_DATE);

        restPrecheMockMvc.perform(put("/api/preches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPreche)))
            .andExpect(status().isOk());

        // Validate the Preche in the database
        List<Preche> precheList = precheRepository.findAll();
        assertThat(precheList).hasSize(databaseSizeBeforeUpdate);
        Preche testPreche = precheList.get(precheList.size() - 1);
        assertThat(testPreche.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPreche.getImam()).isEqualTo(UPDATED_IMAM);
        assertThat(testPreche.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPreche() throws Exception {
        int databaseSizeBeforeUpdate = precheRepository.findAll().size();

        // Create the Preche

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecheMockMvc.perform(put("/api/preches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preche)))
            .andExpect(status().isBadRequest());

        // Validate the Preche in the database
        List<Preche> precheList = precheRepository.findAll();
        assertThat(precheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePreche() throws Exception {
        // Initialize the database
        precheService.save(preche);

        int databaseSizeBeforeDelete = precheRepository.findAll().size();

        // Get the preche
        restPrecheMockMvc.perform(delete("/api/preches/{id}", preche.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Preche> precheList = precheRepository.findAll();
        assertThat(precheList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Preche.class);
        Preche preche1 = new Preche();
        preche1.setId(1L);
        Preche preche2 = new Preche();
        preche2.setId(preche1.getId());
        assertThat(preche1).isEqualTo(preche2);
        preche2.setId(2L);
        assertThat(preche1).isNotEqualTo(preche2);
        preche1.setId(null);
        assertThat(preche1).isNotEqualTo(preche2);
    }
}
