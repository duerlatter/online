package com.xczhihui.bxg.online.common.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the medical_hospital_field database table.
 */
@Entity
@Table(name = "medical_hospital_doctor")
//@NamedQuery(name="MedicalHospitalField.findAll", query="SELECT m FROM MedicalHospitalField m")
public class MedicalHospitalDoctor implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "doctor_id")
    private String doctorId;

    @Column(name = "hospital_id")
    private String hospitalId;

    /**
     * 删除状态
     */
    @Column(name = "deleted")
    private String deleted;

    public MedicalHospitalDoctor() {
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getHospitalId() {
        return this.hospitalId;
    }

    public void setHospitalId(String hospitalId) {
        this.hospitalId = hospitalId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }
}