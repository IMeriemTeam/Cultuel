package com.imeriemlab.sitecultuel.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Preche entity.
 */
public class PrecheDTO implements Serializable {

    private Long id;

    private String title;

    private String imam;

    private LocalDate date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImam() {
        return imam;
    }

    public void setImam(String imam) {
        this.imam = imam;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PrecheDTO precheDTO = (PrecheDTO) o;
        if (precheDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), precheDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrecheDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", imam='" + getImam() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
