package com.licensemanager.gateway.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Productservice.
 */
@Entity
@Table(name = "productservice")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Productservice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productname")
    private String productname;

    @Column(name = "codeproduct")
    private String codeproduct;

    @Column(name = "version")
    private String version;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public Productservice productname(String productname) {
        this.productname = productname;
        return this;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getCodeproduct() {
        return codeproduct;
    }

    public Productservice codeproduct(String codeproduct) {
        this.codeproduct = codeproduct;
        return this;
    }

    public void setCodeproduct(String codeproduct) {
        this.codeproduct = codeproduct;
    }

    public String getVersion() {
        return version;
    }

    public Productservice version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Productservice)) {
            return false;
        }
        return id != null && id.equals(((Productservice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Productservice{" +
            "id=" + getId() +
            ", productname='" + getProductname() + "'" +
            ", codeproduct='" + getCodeproduct() + "'" +
            ", version='" + getVersion() + "'" +
            "}";
    }
}
