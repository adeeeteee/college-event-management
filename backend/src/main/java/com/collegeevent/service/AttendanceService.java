package com.collegeevent.service;

import com.collegeevent.entity.Attendance;
import com.collegeevent.entity.Event;
import com.collegeevent.entity.Registration;
import com.collegeevent.repository.AttendanceRepository;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.RegistrationRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            RegistrationRepository registrationRepository,
            EventRepository eventRepository) {

        this.attendanceRepository = attendanceRepository;
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
    }

    // =========================================
    // MARK ATTENDANCE
    // =========================================

    public Attendance markAttendance(
            Long eventId,
            Long registrationId,
            Long coordinatorId,
            String status) {

        if (!"PRESENT".equals(status) &&
                !"ABSENT".equals(status)) {

            throw new RuntimeException(
                    "Attendance status must be PRESENT or ABSENT"
            );
        }

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                )
                        );

        if (event.getCoordinator() == null ||
                !event.getCoordinator()
                        .getUserId()
                        .equals(coordinatorId)) {

            throw new RuntimeException(
                    "You are not authorized to manage attendance for this event"
            );
        }

        Registration registration =
                registrationRepository.findById(registrationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Registration not found"
                                )
                        );

        if (!registration.getEvent()
                .getEventId()
                .equals(eventId)) {

            throw new RuntimeException(
                    "Registration does not belong to this event"
            );
        }

        if (!"REGISTERED".equals(
                registration.getStatus())) {

            throw new RuntimeException(
                    "Attendance cannot be marked for a cancelled registration"
            );
        }

        Attendance attendance =
                attendanceRepository
                        .findByRegistration_RegistrationId(
                                registrationId
                        )
                        .orElse(null);

        if (attendance != null) {

            attendance.setStatus(status);
            attendance.setMarkedAt(
                    LocalDateTime.now()
            );

            return attendanceRepository.save(
                    attendance
            );
        }

        attendance = new Attendance(
                registration,
                status,
                LocalDateTime.now()
        );

        return attendanceRepository.save(
                attendance
        );
    }


    // =========================================
    // GET ATTENDANCE HISTORY FOR EVENT
    // =========================================

    public List<Attendance> getEventAttendance(
            Long eventId,
            Long coordinatorId) {

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                )
                        );

        if (event.getCoordinator() == null ||
                !event.getCoordinator()
                        .getUserId()
                        .equals(coordinatorId)) {

            throw new RuntimeException(
                    "You are not authorized to view attendance for this event"
            );
        }

        return attendanceRepository
                .findByRegistration_Event_EventId(
                        eventId
                );
    }
}