package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Dons;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dons entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DonsRepository extends JpaRepository<Dons, Long> {

}
