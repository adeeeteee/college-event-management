package com.collegeevent.repository;

import com.collegeevent.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    boolean existsByStudent_UserIdAndEvent_EventId(
            Long studentId,
            Long eventId
    );

    long countByEvent_EventId(Long eventId);

    List<Registration> findByStudent_UserId(
            Long studentId
    );

    Optional<Registration> findByRegistrationIdAndStudent_UserId(
            Long registrationId,
            Long studentId
    );

    Optional<Registration> findByStudent_UserIdAndEvent_EventId(
            Long studentId,
            Long eventId
    );

    List<Registration> findByEvent_EventId(
            Long eventId
    );
}