package com.imeriemlab.sitecultuel.service.mapper;

import com.imeriemlab.sitecultuel.domain.*;
import com.imeriemlab.sitecultuel.service.dto.DonsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Dons and its DTO DonsDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface DonsMapper extends EntityMapper<DonsDTO, Dons> {

    @Mapping(source = "donsUser.id", target = "donsUserId")
    DonsDTO toDto(Dons dons);

    @Mapping(source = "donsUserId", target = "donsUser")
    Dons toEntity(DonsDTO donsDTO);

    default Dons fromId(Long id) {
        if (id == null) {
            return null;
        }
        Dons dons = new Dons();
        dons.setId(id);
        return dons;
    }
}
