package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Preche;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Preche entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecheRepository extends JpaRepository<Preche, Long> {

}
