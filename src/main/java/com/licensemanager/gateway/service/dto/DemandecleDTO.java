package com.licensemanager.gateway.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.licensemanager.gateway.domain.Demandecle} entity.
 */
public class DemandecleDTO implements Serializable {
    
    private Long id;

    private Integer nbreposte;

    private Integer dureecle;

    private String productname;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNbreposte() {
        return nbreposte;
    }

    public void setNbreposte(Integer nbreposte) {
        this.nbreposte = nbreposte;
    }

    public Integer getDureecle() {
        return dureecle;
    }

    public void setDureecle(Integer dureecle) {
        this.dureecle = dureecle;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DemandecleDTO)) {
            return false;
        }

        return id != null && id.equals(((DemandecleDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DemandecleDTO{" +
            "id=" + getId() +
            ", nbreposte=" + getNbreposte() +
            ", dureecle=" + getDureecle() +
            ", productname='" + getProductname() + "'" +
            "}";
    }
}
