package com.licensemanager.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.licensemanager.gateway.web.rest.TestUtil;

public class ActivationkeyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Activationkey.class);
        Activationkey activationkey1 = new Activationkey();
        activationkey1.setId(1L);
        Activationkey activationkey2 = new Activationkey();
        activationkey2.setId(activationkey1.getId());
        assertThat(activationkey1).isEqualTo(activationkey2);
        activationkey2.setId(2L);
        assertThat(activationkey1).isNotEqualTo(activationkey2);
        activationkey1.setId(null);
        assertThat(activationkey1).isNotEqualTo(activationkey2);
    }
}
