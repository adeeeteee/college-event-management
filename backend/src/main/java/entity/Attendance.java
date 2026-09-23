package com.collegeevent.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "attendance",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"registration_id"}
        )
    }
)
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @OneToOne
    @JoinColumn(
        name = "registration_id",
        nullable = false
    )
    private Registration registration;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime markedAt;

    public Attendance() {
    }

    public Attendance(
            Registration registration,
            String status,
            LocalDateTime markedAt) {

        this.registration = registration;
        this.status = status;
        this.markedAt = markedAt;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Registration getRegistration() {
        return registration;
    }

    public void setRegistration(
            Registration registration) {

        this.registration = registration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getMarkedAt() {
        return markedAt;
    }

    public void setMarkedAt(
            LocalDateTime markedAt) {

        this.markedAt = markedAt;
    }
}