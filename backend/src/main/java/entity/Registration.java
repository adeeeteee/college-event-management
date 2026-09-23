package com.collegeevent.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "registrations",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"student_id", "event_id"}
        )
    }
)
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registrationId;

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

    @Column(nullable = false)
    private LocalDateTime registrationDate;

    @Column(nullable = false)
    private String status;


    public Registration() {
    }


    public Registration(
            User student,
            Event event,
            LocalDateTime registrationDate,
            String status) {

        this.student = student;
        this.event = event;
        this.registrationDate = registrationDate;
        this.status = status;
    }


    public Long getRegistrationId() {
        return registrationId;
    }


    public void setRegistrationId(Long registrationId) {
        this.registrationId = registrationId;
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


    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }


    public void setRegistrationDate(
            LocalDateTime registrationDate) {

        this.registrationDate = registrationDate;
    }


    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }
}
