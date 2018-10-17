package com.imeriemlab.sitecultuel.repository;

import com.imeriemlab.sitecultuel.domain.Methods;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Methods entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MethodsRepository extends JpaRepository<Methods, Long> {

}
