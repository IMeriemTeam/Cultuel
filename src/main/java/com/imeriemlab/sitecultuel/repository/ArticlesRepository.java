package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Articles;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Articles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticlesRepository extends JpaRepository<Articles, Long> {

    @Query("select articles from Articles articles where articles.user.login = ?#{principal.username}")
    List<Articles> findByUserIsCurrentUser();

}
