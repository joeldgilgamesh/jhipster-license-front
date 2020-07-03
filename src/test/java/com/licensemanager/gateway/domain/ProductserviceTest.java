package com.licensemanager.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.licensemanager.gateway.web.rest.TestUtil;

public class ProductserviceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productservice.class);
        Productservice productservice1 = new Productservice();
        productservice1.setId(1L);
        Productservice productservice2 = new Productservice();
        productservice2.setId(productservice1.getId());
        assertThat(productservice1).isEqualTo(productservice2);
        productservice2.setId(2L);
        assertThat(productservice1).isNotEqualTo(productservice2);
        productservice1.setId(null);
        assertThat(productservice1).isNotEqualTo(productservice2);
    }
}
