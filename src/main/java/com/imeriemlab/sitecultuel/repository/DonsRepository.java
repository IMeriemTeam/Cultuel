package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Dons;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Dons entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DonsRepository extends JpaRepository<Dons, Long> {

    @Query("select dons from Dons dons where dons.dons.login = ?#{principal.username}")
    List<Dons> findByDonsIsCurrentUser();

}
