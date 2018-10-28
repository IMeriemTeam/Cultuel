package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Degrees;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Degrees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DegreesRepository extends JpaRepository<Degrees, Long> {

}
