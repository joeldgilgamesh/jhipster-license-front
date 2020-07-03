package com.licensemanager.gateway.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Activationkey.
 */
@Entity
@Table(name = "activationkey")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Activationkey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "keyactivation")
    private String keyactivation;

    @Column(name = "productname")
    private String productname;

    @Column(name = "nbreposte")
    private Integer nbreposte;

    @Column(name = "nbreinstanceon")
    private Integer nbreinstanceon;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Activationkey username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getKeyactivation() {
        return keyactivation;
    }

    public Activationkey keyactivation(String keyactivation) {
        this.keyactivation = keyactivation;
        return this;
    }

    public void setKeyactivation(String keyactivation) {
        this.keyactivation = keyactivation;
    }

    public String getProductname() {
        return productname;
    }

    public Activationkey productname(String productname) {
        this.productname = productname;
        return this;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public Integer getNbreposte() {
        return nbreposte;
    }

    public Activationkey nbreposte(Integer nbreposte) {
        this.nbreposte = nbreposte;
        return this;
    }

    public void setNbreposte(Integer nbreposte) {
        this.nbreposte = nbreposte;
    }

    public Integer getNbreinstanceon() {
        return nbreinstanceon;
    }

    public Activationkey nbreinstanceon(Integer nbreinstanceon) {
        this.nbreinstanceon = nbreinstanceon;
        return this;
    }

    public void setNbreinstanceon(Integer nbreinstanceon) {
        this.nbreinstanceon = nbreinstanceon;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Activationkey)) {
            return false;
        }
        return id != null && id.equals(((Activationkey) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Activationkey{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", keyactivation='" + getKeyactivation() + "'" +
            ", productname='" + getProductname() + "'" +
            ", nbreposte=" + getNbreposte() +
            ", nbreinstanceon=" + getNbreinstanceon() +
            "}";
    }
}
