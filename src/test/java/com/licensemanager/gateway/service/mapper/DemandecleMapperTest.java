package com.licensemanager.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class DemandecleMapperTest {

    private DemandecleMapper demandecleMapper;

    @BeforeEach
    public void setUp() {
        demandecleMapper = new DemandecleMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(demandecleMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(demandecleMapper.fromId(null)).isNull();
    }
}
