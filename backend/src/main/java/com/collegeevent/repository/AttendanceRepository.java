package com.collegeevent.repository;

import com.collegeevent.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    Optional<Attendance>
    findByRegistration_RegistrationId(
            Long registrationId
    );

    List<Attendance>
    findByRegistration_Event_EventId(
            Long eventId
    );

    long countByStatus(String status);
}