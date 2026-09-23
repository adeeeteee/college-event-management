package com.collegeevent.dto;

import com.collegeevent.entity.Attendance;

import java.time.LocalDateTime;

public class AttendanceResponse {

    private Long attendanceId;

    private Long registrationId;

    private Long eventId;

    private String eventName;

    private String studentName;

    private String status;

    private LocalDateTime markedAt;

    public AttendanceResponse(
            Attendance attendance) {

        this.attendanceId =
                attendance.getAttendanceId();

        this.registrationId =
                attendance.getRegistration()
                        .getRegistrationId();

        this.eventId =
                attendance.getRegistration()
                        .getEvent()
                        .getEventId();

        this.eventName =
                attendance.getRegistration()
                        .getEvent()
                        .getName();

        this.studentName =
                attendance.getRegistration()
                        .getStudent()
                        .getName();

        this.status =
                attendance.getStatus();

        this.markedAt =
                attendance.getMarkedAt();
    }

    public Long getAttendanceId() {
        return attendanceId;
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

    public String getStudentName() {
        return studentName;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getMarkedAt() {
        return markedAt;
    }
}