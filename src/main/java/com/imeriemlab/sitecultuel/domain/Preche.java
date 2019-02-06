package com.imeriemlab.sitecultuel.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Task entity.
 * @author The IMeriem team.
 */
@Entity
@Table(name = "preche")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Preche implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "imam")
    private String imam;

    @Column(name = "jhi_date")
    private LocalDate date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Preche title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImam() {
        return imam;
    }

    public Preche imam(String imam) {
        this.imam = imam;
        return this;
    }

    public void setImam(String imam) {
        this.imam = imam;
    }

    public LocalDate getDate() {
        return date;
    }

    public Preche date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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
        Preche preche = (Preche) o;
        if (preche.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preche.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Preche{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", imam='" + getImam() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
