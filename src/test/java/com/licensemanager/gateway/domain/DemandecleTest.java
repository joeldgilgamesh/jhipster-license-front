package com.licensemanager.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.licensemanager.gateway.web.rest.TestUtil;

public class DemandecleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Demandecle.class);
        Demandecle demandecle1 = new Demandecle();
        demandecle1.setId(1L);
        Demandecle demandecle2 = new Demandecle();
        demandecle2.setId(demandecle1.getId());
        assertThat(demandecle1).isEqualTo(demandecle2);
        demandecle2.setId(2L);
        assertThat(demandecle1).isNotEqualTo(demandecle2);
        demandecle1.setId(null);
        assertThat(demandecle1).isNotEqualTo(demandecle2);
    }
}
