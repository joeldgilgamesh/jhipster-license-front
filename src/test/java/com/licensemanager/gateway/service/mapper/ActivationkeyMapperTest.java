package com.licensemanager.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ActivationkeyMapperTest {

    private ActivationkeyMapper activationkeyMapper;

    @BeforeEach
    public void setUp() {
        activationkeyMapper = new ActivationkeyMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(activationkeyMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(activationkeyMapper.fromId(null)).isNull();
    }
}
