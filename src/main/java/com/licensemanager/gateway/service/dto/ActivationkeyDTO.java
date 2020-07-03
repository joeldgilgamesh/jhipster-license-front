package com.licensemanager.gateway.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.licensemanager.gateway.domain.Activationkey} entity.
 */
public class ActivationkeyDTO implements Serializable {
    
    private Long id;

    private String username;

    private String keyactivation;

    private String productname;

    private Integer nbreposte;

    private Integer nbreinstanceon;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getKeyactivation() {
        return keyactivation;
    }

    public void setKeyactivation(String keyactivation) {
        this.keyactivation = keyactivation;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public Integer getNbreposte() {
        return nbreposte;
    }

    public void setNbreposte(Integer nbreposte) {
        this.nbreposte = nbreposte;
    }

    public Integer getNbreinstanceon() {
        return nbreinstanceon;
    }

    public void setNbreinstanceon(Integer nbreinstanceon) {
        this.nbreinstanceon = nbreinstanceon;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ActivationkeyDTO)) {
            return false;
        }

        return id != null && id.equals(((ActivationkeyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ActivationkeyDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", keyactivation='" + getKeyactivation() + "'" +
            ", productname='" + getProductname() + "'" +
            ", nbreposte=" + getNbreposte() +
            ", nbreinstanceon=" + getNbreinstanceon() +
            "}";
    }
}
