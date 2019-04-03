package com.imeriemlab.sitecultuel.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Dons entity.
 */
public class DonsDTO implements Serializable {

    private Long id;

    private Float don;

    private LocalDate dateDons;

    private String labelDon;


    private Long donsUserId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getDon() {
        return don;
    }

    public void setDon(Float don) {
        this.don = don;
    }

    public LocalDate getDateDons() {
        return dateDons;
    }

    public void setDateDons(LocalDate dateDons) {
        this.dateDons = dateDons;
    }

    public String getLabelDon() {
        return labelDon;
    }

    public void setLabelDon(String labelDon) {
        this.labelDon = labelDon;
    }

    public Long getDonsUserId() {
        return donsUserId;
    }

    public void setDonsUserId(Long userId) {
        this.donsUserId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DonsDTO donsDTO = (DonsDTO) o;
        if (donsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), donsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DonsDTO{" +
            "id=" + getId() +
            ", don=" + getDon() +
            ", dateDons='" + getDateDons() + "'" +
            ", labelDon='" + getLabelDon() + "'" +
            ", donsUser=" + getDonsUserId() +
            "}";
    }
}
