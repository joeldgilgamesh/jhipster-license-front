package com.licensemanager.gateway.service.mapper;


import com.licensemanager.gateway.domain.*;
import com.licensemanager.gateway.service.dto.ProductserviceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Productservice} and its DTO {@link ProductserviceDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductserviceMapper extends EntityMapper<ProductserviceDTO, Productservice> {



    default Productservice fromId(Long id) {
        if (id == null) {
            return null;
        }
        Productservice productservice = new Productservice();
        productservice.setId(id);
        return productservice;
    }
}
