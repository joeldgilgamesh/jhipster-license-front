package com.licensemanager.gateway.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.licensemanager.gateway.domain.Productservice} entity.
 */
public class ProductserviceDTO implements Serializable {
    
    private Long id;

    private String productname;

    private String codeproduct;

    private String version;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getCodeproduct() {
        return codeproduct;
    }

    public void setCodeproduct(String codeproduct) {
        this.codeproduct = codeproduct;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductserviceDTO)) {
            return false;
        }

        return id != null && id.equals(((ProductserviceDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductserviceDTO{" +
            "id=" + getId() +
            ", productname='" + getProductname() + "'" +
            ", codeproduct='" + getCodeproduct() + "'" +
            ", version='" + getVersion() + "'" +
            "}";
    }
}
