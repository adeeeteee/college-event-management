package com.collegeevent.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "certificates",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"student_id", "event_id"}
        )
    }
)
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long certificateId;

    @ManyToOne
    @JoinColumn(
        name = "student_id",
        nullable = false
    )
    private User student;

    @ManyToOne
    @JoinColumn(
        name = "event_id",
        nullable = false
    )
    private Event event;

    @Column(
        nullable = false,
        unique = true
    )
    private String certificateNumber;

    @Column(nullable = false)
    private LocalDateTime issueDate;

    @Column(nullable = false)
    private Integer aictePoints;

    public Certificate() {
    }

    public Certificate(
            User student,
            Event event,
            String certificateNumber,
            LocalDateTime issueDate,
            Integer aictePoints) {

        this.student = student;
        this.event = event;
        this.certificateNumber = certificateNumber;
        this.issueDate = issueDate;
        this.aictePoints = aictePoints;
    }

    public Long getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(Long certificateId) {
        this.certificateId = certificateId;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(String certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public LocalDateTime getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDateTime issueDate) {
        this.issueDate = issueDate;
    }

    public Integer getAictePoints() {
        return aictePoints;
    }

    public void setAictePoints(Integer aictePoints) {
        this.aictePoints = aictePoints;
    }
}