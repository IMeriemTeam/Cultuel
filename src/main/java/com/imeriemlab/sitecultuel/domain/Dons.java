package com.imeriemlab.sitecultuel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Dons.
 */
@Entity
@Table(name = "dons")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Dons implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "don")
    private Long don;

    @Column(name = "date_dons")
    private LocalDate dateDons;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User dons;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public Dons uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Long getDon() {
        return don;
    }

    public Dons don(Long don) {
        this.don = don;
        return this;
    }

    public void setDon(Long don) {
        this.don = don;
    }

    public LocalDate getDateDons() {
        return dateDons;
    }

    public Dons dateDons(LocalDate dateDons) {
        this.dateDons = dateDons;
        return this;
    }

    public void setDateDons(LocalDate dateDons) {
        this.dateDons = dateDons;
    }

    public User getDons() {
        return dons;
    }

    public Dons dons(User user) {
        this.dons = user;
        return this;
    }

    public void setDons(User user) {
        this.dons = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Dons dons = (Dons) o;
        if (dons.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dons.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Dons{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", don=" + getDon() +
            ", dateDons='" + getDateDons() + "'" +
            "}";
    }
}
