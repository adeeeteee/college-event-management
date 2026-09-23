package com.collegeevent.dto;

import com.collegeevent.entity.Certificate;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CertificateResponse {

    private Long certificateId;
    private String certificateNumber;

    private Long studentId;
    private String studentName;

    private Long eventId;
    private String eventName;
    private String eventVenue;

    private LocalDate eventDate;
    private LocalDateTime issueDate;

    private Integer aictePoints;

    public CertificateResponse(
            Certificate certificate) {

        this.certificateId =
                certificate.getCertificateId();

        this.certificateNumber =
                certificate.getCertificateNumber();

        this.studentId =
                certificate.getStudent()
                        .getUserId();

        this.studentName =
                certificate.getStudent()
                        .getName();

        this.eventId =
                certificate.getEvent()
                        .getEventId();

        this.eventName =
                certificate.getEvent()
                        .getName();

        this.eventVenue =
                certificate.getEvent()
                        .getVenue();

        this.eventDate =
                certificate.getEvent()
                        .getDate();

        this.issueDate =
                certificate.getIssueDate();

        this.aictePoints =
                certificate.getAictePoints();
    }

    public Long getCertificateId() {
        return certificateId;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public String getEventVenue() {
        return eventVenue;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public LocalDateTime getIssueDate() {
        return issueDate;
    }

    public Integer getAictePoints() {
        return aictePoints;
    }
}
