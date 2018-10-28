package com.imeriemlab.sitecultuel.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.imeriemlab.sitecultuel.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Region.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Department.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Dons.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Prayer.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Degrees.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Methods.class.getName(), jcacheConfiguration);
            cm.createCache(com.imeriemlab.sitecultuel.domain.Preche.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
