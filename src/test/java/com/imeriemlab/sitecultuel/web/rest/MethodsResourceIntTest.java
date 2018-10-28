package com.imeriemlab.sitecultuel.web.rest;

import com.imeriemlab.sitecultuel.CultuelApp;

import com.imeriemlab.sitecultuel.domain.Methods;
import com.imeriemlab.sitecultuel.repository.MethodsRepository;
import com.imeriemlab.sitecultuel.service.MethodsService;
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
import java.util.List;


import static com.imeriemlab.sitecultuel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MethodsResource REST controller.
 *
 * @see MethodsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CultuelApp.class)
public class MethodsResourceIntTest {

    private static final String DEFAULT_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_METHOD = "BBBBBBBBBB";

    @Autowired
    private MethodsRepository methodsRepository;
    
    @Autowired
    private MethodsService methodsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMethodsMockMvc;

    private Methods methods;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MethodsResource methodsResource = new MethodsResource(methodsService);
        this.restMethodsMockMvc = MockMvcBuilders.standaloneSetup(methodsResource)
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
    public static Methods createEntity(EntityManager em) {
        Methods methods = new Methods()
            .method(DEFAULT_METHOD);
        return methods;
    }

    @Before
    public void initTest() {
        methods = createEntity(em);
    }

    @Test
    @Transactional
    public void createMethods() throws Exception {
        int databaseSizeBeforeCreate = methodsRepository.findAll().size();

        // Create the Methods
        restMethodsMockMvc.perform(post("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(methods)))
            .andExpect(status().isCreated());

        // Validate the Methods in the database
        List<Methods> methodsList = methodsRepository.findAll();
        assertThat(methodsList).hasSize(databaseSizeBeforeCreate + 1);
        Methods testMethods = methodsList.get(methodsList.size() - 1);
        assertThat(testMethods.getMethod()).isEqualTo(DEFAULT_METHOD);
    }

    @Test
    @Transactional
    public void createMethodsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = methodsRepository.findAll().size();

        // Create the Methods with an existing ID
        methods.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMethodsMockMvc.perform(post("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(methods)))
            .andExpect(status().isBadRequest());

        // Validate the Methods in the database
        List<Methods> methodsList = methodsRepository.findAll();
        assertThat(methodsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMethods() throws Exception {
        // Initialize the database
        methodsRepository.saveAndFlush(methods);

        // Get all the methodsList
        restMethodsMockMvc.perform(get("/api/methods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(methods.getId().intValue())))
            .andExpect(jsonPath("$.[*].method").value(hasItem(DEFAULT_METHOD.toString())));
    }
    
    @Test
    @Transactional
    public void getMethods() throws Exception {
        // Initialize the database
        methodsRepository.saveAndFlush(methods);

        // Get the methods
        restMethodsMockMvc.perform(get("/api/methods/{id}", methods.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(methods.getId().intValue()))
            .andExpect(jsonPath("$.method").value(DEFAULT_METHOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMethods() throws Exception {
        // Get the methods
        restMethodsMockMvc.perform(get("/api/methods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMethods() throws Exception {
        // Initialize the database
        methodsService.save(methods);

        int databaseSizeBeforeUpdate = methodsRepository.findAll().size();

        // Update the methods
        Methods updatedMethods = methodsRepository.findById(methods.getId()).get();
        // Disconnect from session so that the updates on updatedMethods are not directly saved in db
        em.detach(updatedMethods);
        updatedMethods
            .method(UPDATED_METHOD);

        restMethodsMockMvc.perform(put("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMethods)))
            .andExpect(status().isOk());

        // Validate the Methods in the database
        List<Methods> methodsList = methodsRepository.findAll();
        assertThat(methodsList).hasSize(databaseSizeBeforeUpdate);
        Methods testMethods = methodsList.get(methodsList.size() - 1);
        assertThat(testMethods.getMethod()).isEqualTo(UPDATED_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingMethods() throws Exception {
        int databaseSizeBeforeUpdate = methodsRepository.findAll().size();

        // Create the Methods

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMethodsMockMvc.perform(put("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(methods)))
            .andExpect(status().isBadRequest());

        // Validate the Methods in the database
        List<Methods> methodsList = methodsRepository.findAll();
        assertThat(methodsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMethods() throws Exception {
        // Initialize the database
        methodsService.save(methods);

        int databaseSizeBeforeDelete = methodsRepository.findAll().size();

        // Get the methods
        restMethodsMockMvc.perform(delete("/api/methods/{id}", methods.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Methods> methodsList = methodsRepository.findAll();
        assertThat(methodsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Methods.class);
        Methods methods1 = new Methods();
        methods1.setId(1L);
        Methods methods2 = new Methods();
        methods2.setId(methods1.getId());
        assertThat(methods1).isEqualTo(methods2);
        methods2.setId(2L);
        assertThat(methods1).isNotEqualTo(methods2);
        methods1.setId(null);
        assertThat(methods1).isNotEqualTo(methods2);
    }
}
