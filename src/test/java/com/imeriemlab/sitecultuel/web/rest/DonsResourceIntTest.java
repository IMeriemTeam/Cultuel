package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.CultuelApp;

import com.imeriemlab.sitecultuel.domain.Dons;
import com.imeriemlab.sitecultuel.repository.DonsRepository;
import com.imeriemlab.sitecultuel.service.DonsService;
import com.imeriemlab.sitecultuel.service.dto.DonsDTO;
import com.imeriemlab.sitecultuel.service.mapper.DonsMapper;
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
 * Test class for the DonsResource REST controller.
 *
 * @see DonsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CultuelApp.class)
public class DonsResourceIntTest {

    private static final Float DEFAULT_DON = 1F;
    private static final Float UPDATED_DON = 2F;

    private static final LocalDate DEFAULT_DATE_DONS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DONS = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LABEL_DON = "AAAAAAAAAA";
    private static final String UPDATED_LABEL_DON = "BBBBBBBBBB";

    @Autowired
    private DonsRepository donsRepository;

    @Autowired
    private DonsMapper donsMapper;

    @Autowired
    private DonsService donsService;

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

    private MockMvc restDonsMockMvc;

    private Dons dons;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DonsResource donsResource = new DonsResource(donsService);
        this.restDonsMockMvc = MockMvcBuilders.standaloneSetup(donsResource)
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
    public static Dons createEntity(EntityManager em) {
        Dons dons = new Dons()
            .don(DEFAULT_DON)
            .dateDons(DEFAULT_DATE_DONS)
            .labelDon(DEFAULT_LABEL_DON);
        return dons;
    }

    @Before
    public void initTest() {
        dons = createEntity(em);
    }

    @Test
    @Transactional
    public void createDons() throws Exception {
        int databaseSizeBeforeCreate = donsRepository.findAll().size();

        // Create the Dons
        DonsDTO donsDTO = donsMapper.toDto(dons);
        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isCreated());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeCreate + 1);
        Dons testDons = donsList.get(donsList.size() - 1);
        assertThat(testDons.getDon()).isEqualTo(DEFAULT_DON);
        assertThat(testDons.getDateDons()).isEqualTo(DEFAULT_DATE_DONS);
        assertThat(testDons.getLabelDon()).isEqualTo(DEFAULT_LABEL_DON);
    }

    @Test
    @Transactional
    public void createDonsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = donsRepository.findAll().size();

        // Create the Dons with an existing ID
        dons.setId(1L);
        DonsDTO donsDTO = donsMapper.toDto(dons);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        // Get all the donsList
        restDonsMockMvc.perform(get("/api/dons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dons.getId().intValue())))
            .andExpect(jsonPath("$.[*].don").value(hasItem(DEFAULT_DON.doubleValue())))
            .andExpect(jsonPath("$.[*].dateDons").value(hasItem(DEFAULT_DATE_DONS.toString())))
            .andExpect(jsonPath("$.[*].labelDon").value(hasItem(DEFAULT_LABEL_DON.toString())));
    }
    
    @Test
    @Transactional
    public void getDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        // Get the dons
        restDonsMockMvc.perform(get("/api/dons/{id}", dons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dons.getId().intValue()))
            .andExpect(jsonPath("$.don").value(DEFAULT_DON.doubleValue()))
            .andExpect(jsonPath("$.dateDons").value(DEFAULT_DATE_DONS.toString()))
            .andExpect(jsonPath("$.labelDon").value(DEFAULT_LABEL_DON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDons() throws Exception {
        // Get the dons
        restDonsMockMvc.perform(get("/api/dons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        int databaseSizeBeforeUpdate = donsRepository.findAll().size();

        // Update the dons
        Dons updatedDons = donsRepository.findById(dons.getId()).get();
        // Disconnect from session so that the updates on updatedDons are not directly saved in db
        em.detach(updatedDons);
        updatedDons
            .don(UPDATED_DON)
            .dateDons(UPDATED_DATE_DONS)
            .labelDon(UPDATED_LABEL_DON);
        DonsDTO donsDTO = donsMapper.toDto(updatedDons);

        restDonsMockMvc.perform(put("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isOk());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeUpdate);
        Dons testDons = donsList.get(donsList.size() - 1);
        assertThat(testDons.getDon()).isEqualTo(UPDATED_DON);
        assertThat(testDons.getDateDons()).isEqualTo(UPDATED_DATE_DONS);
        assertThat(testDons.getLabelDon()).isEqualTo(UPDATED_LABEL_DON);
    }

    @Test
    @Transactional
    public void updateNonExistingDons() throws Exception {
        int databaseSizeBeforeUpdate = donsRepository.findAll().size();

        // Create the Dons
        DonsDTO donsDTO = donsMapper.toDto(dons);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonsMockMvc.perform(put("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        int databaseSizeBeforeDelete = donsRepository.findAll().size();

        // Delete the dons
        restDonsMockMvc.perform(delete("/api/dons/{id}", dons.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dons.class);
        Dons dons1 = new Dons();
        dons1.setId(1L);
        Dons dons2 = new Dons();
        dons2.setId(dons1.getId());
        assertThat(dons1).isEqualTo(dons2);
        dons2.setId(2L);
        assertThat(dons1).isNotEqualTo(dons2);
        dons1.setId(null);
        assertThat(dons1).isNotEqualTo(dons2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DonsDTO.class);
        DonsDTO donsDTO1 = new DonsDTO();
        donsDTO1.setId(1L);
        DonsDTO donsDTO2 = new DonsDTO();
        assertThat(donsDTO1).isNotEqualTo(donsDTO2);
        donsDTO2.setId(donsDTO1.getId());
        assertThat(donsDTO1).isEqualTo(donsDTO2);
        donsDTO2.setId(2L);
        assertThat(donsDTO1).isNotEqualTo(donsDTO2);
        donsDTO1.setId(null);
        assertThat(donsDTO1).isNotEqualTo(donsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(donsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(donsMapper.fromId(null)).isNull();
    }
}
