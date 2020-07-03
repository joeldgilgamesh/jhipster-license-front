package com.licensemanager.gateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.licensemanager.gateway.web.rest.TestUtil;

public class ActivationkeyDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ActivationkeyDTO.class);
        ActivationkeyDTO activationkeyDTO1 = new ActivationkeyDTO();
        activationkeyDTO1.setId(1L);
        ActivationkeyDTO activationkeyDTO2 = new ActivationkeyDTO();
        assertThat(activationkeyDTO1).isNotEqualTo(activationkeyDTO2);
        activationkeyDTO2.setId(activationkeyDTO1.getId());
        assertThat(activationkeyDTO1).isEqualTo(activationkeyDTO2);
        activationkeyDTO2.setId(2L);
        assertThat(activationkeyDTO1).isNotEqualTo(activationkeyDTO2);
        activationkeyDTO1.setId(null);
        assertThat(activationkeyDTO1).isNotEqualTo(activationkeyDTO2);
    }
}
