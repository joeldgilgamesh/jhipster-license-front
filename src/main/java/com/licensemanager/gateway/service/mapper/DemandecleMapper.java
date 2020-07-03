package com.licensemanager.gateway.service.mapper;


import com.licensemanager.gateway.domain.*;
import com.licensemanager.gateway.service.dto.DemandecleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Demandecle} and its DTO {@link DemandecleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DemandecleMapper extends EntityMapper<DemandecleDTO, Demandecle> {



    default Demandecle fromId(Long id) {
        if (id == null) {
            return null;
        }
        Demandecle demandecle = new Demandecle();
        demandecle.setId(id);
        return demandecle;
    }
}
