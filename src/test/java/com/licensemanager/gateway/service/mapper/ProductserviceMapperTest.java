package com.licensemanager.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ProductserviceMapperTest {

    private ProductserviceMapper productserviceMapper;

    @BeforeEach
    public void setUp() {
        productserviceMapper = new ProductserviceMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(productserviceMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(productserviceMapper.fromId(null)).isNull();
    }
}
