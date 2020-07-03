package com.licensemanager.gateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.licensemanager.gateway.web.rest.TestUtil;

public class ProductserviceDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductserviceDTO.class);
        ProductserviceDTO productserviceDTO1 = new ProductserviceDTO();
        productserviceDTO1.setId(1L);
        ProductserviceDTO productserviceDTO2 = new ProductserviceDTO();
        assertThat(productserviceDTO1).isNotEqualTo(productserviceDTO2);
        productserviceDTO2.setId(productserviceDTO1.getId());
        assertThat(productserviceDTO1).isEqualTo(productserviceDTO2);
        productserviceDTO2.setId(2L);
        assertThat(productserviceDTO1).isNotEqualTo(productserviceDTO2);
        productserviceDTO1.setId(null);
        assertThat(productserviceDTO1).isNotEqualTo(productserviceDTO2);
    }
}
