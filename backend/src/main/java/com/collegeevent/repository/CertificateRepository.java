package com.collegeevent.repository;

import com.collegeevent.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository
        extends JpaRepository<Certificate, Long> {

    boolean existsByStudent_UserIdAndEvent_EventId(
            Long studentId,
            Long eventId
    );

    List<Certificate> findByStudent_UserId(
            Long studentId
    );

    List<Certificate> findByEvent_EventId(
            Long eventId
    );
}