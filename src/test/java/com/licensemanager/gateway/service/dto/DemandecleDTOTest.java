package com.licensemanager.gateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.licensemanager.gateway.web.rest.TestUtil;

public class DemandecleDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemandecleDTO.class);
        DemandecleDTO demandecleDTO1 = new DemandecleDTO();
        demandecleDTO1.setId(1L);
        DemandecleDTO demandecleDTO2 = new DemandecleDTO();
        assertThat(demandecleDTO1).isNotEqualTo(demandecleDTO2);
        demandecleDTO2.setId(demandecleDTO1.getId());
        assertThat(demandecleDTO1).isEqualTo(demandecleDTO2);
        demandecleDTO2.setId(2L);
        assertThat(demandecleDTO1).isNotEqualTo(demandecleDTO2);
        demandecleDTO1.setId(null);
        assertThat(demandecleDTO1).isNotEqualTo(demandecleDTO2);
    }
}
