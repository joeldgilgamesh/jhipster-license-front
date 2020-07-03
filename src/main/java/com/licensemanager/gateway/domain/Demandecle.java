package com.licensemanager.gateway.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Demandecle.
 */
@Entity
@Table(name = "demandecle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Demandecle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nbreposte")
    private Integer nbreposte;

    @Column(name = "dureecle")
    private Integer dureecle;

    @Column(name = "productname")
    private String productname;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNbreposte() {
        return nbreposte;
    }

    public Demandecle nbreposte(Integer nbreposte) {
        this.nbreposte = nbreposte;
        return this;
    }

    public void setNbreposte(Integer nbreposte) {
        this.nbreposte = nbreposte;
    }

    public Integer getDureecle() {
        return dureecle;
    }

    public Demandecle dureecle(Integer dureecle) {
        this.dureecle = dureecle;
        return this;
    }

    public void setDureecle(Integer dureecle) {
        this.dureecle = dureecle;
    }

    public String getProductname() {
        return productname;
    }

    public Demandecle productname(String productname) {
        this.productname = productname;
        return this;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Demandecle)) {
            return false;
        }
        return id != null && id.equals(((Demandecle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Demandecle{" +
            "id=" + getId() +
            ", nbreposte=" + getNbreposte() +
            ", dureecle=" + getDureecle() +
            ", productname='" + getProductname() + "'" +
            "}";
    }
}
