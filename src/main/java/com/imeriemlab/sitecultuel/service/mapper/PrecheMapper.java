package com.imeriemlab.sitecultuel.service.mapper;

import com.imeriemlab.sitecultuel.domain.*;
import com.imeriemlab.sitecultuel.service.dto.PrecheDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Preche and its DTO PrecheDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PrecheMapper extends EntityMapper<PrecheDTO, Preche> {



    default Preche fromId(Long id) {
        if (id == null) {
            return null;
        }
        Preche preche = new Preche();
        preche.setId(id);
        return preche;
    }
}
