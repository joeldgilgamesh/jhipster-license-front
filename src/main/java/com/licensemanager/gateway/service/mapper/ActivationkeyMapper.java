package com.licensemanager.gateway.service.mapper;


import com.licensemanager.gateway.domain.*;
import com.licensemanager.gateway.service.dto.ActivationkeyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Activationkey} and its DTO {@link ActivationkeyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ActivationkeyMapper extends EntityMapper<ActivationkeyDTO, Activationkey> {



    default Activationkey fromId(Long id) {
        if (id == null) {
            return null;
        }
        Activationkey activationkey = new Activationkey();
        activationkey.setId(id);
        return activationkey;
    }
}
