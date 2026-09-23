package com.collegeevent.dto;

import com.collegeevent.entity.Registration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class RegistrationResponse {

    private Long registrationId;

    private Long eventId;

    private String eventName;

    private String eventDescription;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private String eventVenue;

    private String studentName;

    private String status;

    private LocalDateTime registrationDate;

    public RegistrationResponse(
            Registration registration) {

        this.registrationId =
                registration.getRegistrationId();

        this.eventId =
                registration.getEvent().getEventId();

        this.eventName =
                registration.getEvent().getName();

        this.eventDescription =
                registration.getEvent().getDescription();

        this.eventDate =
                registration.getEvent().getDate();

        this.eventTime =
                registration.getEvent().getTime();

        this.eventVenue =
                registration.getEvent().getVenue();

        this.studentName =
                registration.getStudent().getName();

        this.status =
                registration.getStatus();

        this.registrationDate =
                registration.getRegistrationDate();
    }

    public Long getRegistrationId() {
        return registrationId;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public String getEventVenue() {
        return eventVenue;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }
}