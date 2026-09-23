package com.collegeevent.service;

import com.collegeevent.entity.Attendance;
import com.collegeevent.entity.Certificate;
import com.collegeevent.entity.Event;
import com.collegeevent.entity.Registration;
import com.collegeevent.entity.User;
import com.collegeevent.repository.AttendanceRepository;
import com.collegeevent.repository.CertificateRepository;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.RegistrationRepository;
import com.collegeevent.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CertificateService {

    private static final int AICTE_POINTS = 15;

    private final CertificateRepository certificateRepository;
    private final AttendanceRepository attendanceRepository;
    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public CertificateService(
            CertificateRepository certificateRepository,
            AttendanceRepository attendanceRepository,
            RegistrationRepository registrationRepository,
            EventRepository eventRepository,
            UserRepository userRepository) {

        this.certificateRepository =
                certificateRepository;

        this.attendanceRepository =
                attendanceRepository;

        this.registrationRepository =
                registrationRepository;

        this.eventRepository =
                eventRepository;

        this.userRepository =
                userRepository;
    }

    // =========================================
    // GENERATE CERTIFICATE
    // =========================================

    public Certificate generateCertificate(
            Long eventId,
            Long registrationId,
            Long coordinatorId) {

        // -----------------------------------------
        // FIND EVENT
        // -----------------------------------------

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                )
                        );

        // -----------------------------------------
        // VERIFY COORDINATOR
        // -----------------------------------------

        if (event.getCoordinator() == null ||
                !event.getCoordinator()
                        .getUserId()
                        .equals(coordinatorId)) {

            throw new RuntimeException(
                    "You are not authorized to generate certificates for this event"
            );
        }

        // -----------------------------------------
        // FIND REGISTRATION
        // -----------------------------------------

        Registration registration =
                registrationRepository.findById(
                        registrationId
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Registration not found"
                        )
                );

        // -----------------------------------------
        // VERIFY REGISTRATION BELONGS TO EVENT
        // -----------------------------------------

        if (!registration.getEvent()
                .getEventId()
                .equals(eventId)) {

            throw new RuntimeException(
                    "Registration does not belong to this event"
            );
        }

        // -----------------------------------------
        // VERIFY REGISTRATION IS ACTIVE
        // -----------------------------------------

        if (!"REGISTERED".equals(
                registration.getStatus())) {

            throw new RuntimeException(
                    "Certificate cannot be generated for a cancelled registration"
            );
        }

        // -----------------------------------------
        // CHECK ATTENDANCE
        // -----------------------------------------

        Attendance attendance =
                attendanceRepository
                        .findByRegistration_RegistrationId(
                                registrationId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Attendance has not been marked for this student"
                                )
                        );

        // -----------------------------------------
        // ONLY PRESENT STUDENTS ARE ELIGIBLE
        // -----------------------------------------

        if (!"PRESENT".equals(
                attendance.getStatus())) {

            throw new RuntimeException(
                    "Certificate can only be generated for students marked PRESENT"
            );
        }

        // -----------------------------------------
        // CHECK FOR EXISTING CERTIFICATE
        // -----------------------------------------

        if (certificateRepository
                .existsByStudent_UserIdAndEvent_EventId(
                        registration.getStudent()
                                .getUserId(),
                        eventId
                )) {

            throw new RuntimeException(
                    "Certificate already exists for this student and event"
            );
        }

        // -----------------------------------------
        // GENERATE CERTIFICATE NUMBER
        // -----------------------------------------

        String certificateNumber =
                "CERT-" +
                eventId +
                "-" +
                registrationId +
                "-" +
                System.currentTimeMillis();

        // -----------------------------------------
        // CREATE CERTIFICATE
        // -----------------------------------------

        Certificate certificate =
                new Certificate(
                        registration.getStudent(),
                        event,
                        certificateNumber,
                        LocalDateTime.now(),
                        AICTE_POINTS
                );

        return certificateRepository.save(
                certificate
        );
    }

    // =========================================
    // COORDINATOR - GET SINGLE CERTIFICATE
    // =========================================

    public Certificate getCoordinatorCertificate(
            Long eventId,
            Long registrationId,
            Long coordinatorId) {

        // -----------------------------------------
        // FIND EVENT
        // -----------------------------------------

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                )
                        );

        // -----------------------------------------
        // VERIFY COORDINATOR OWNS EVENT
        // -----------------------------------------

        if (event.getCoordinator() == null ||
                !event.getCoordinator()
                        .getUserId()
                        .equals(coordinatorId)) {

            throw new RuntimeException(
                    "You are not authorized to view certificates for this event"
            );
        }

        // -----------------------------------------
        // FIND REGISTRATION
        // -----------------------------------------

        Registration registration =
                registrationRepository.findById(
                        registrationId
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Registration not found"
                        )
                );

        // -----------------------------------------
        // VERIFY REGISTRATION BELONGS TO EVENT
        // -----------------------------------------

        if (!registration.getEvent()
                .getEventId()
                .equals(eventId)) {

            throw new RuntimeException(
                    "Registration does not belong to this event"
            );
        }

        // -----------------------------------------
        // FIND CERTIFICATE FOR THIS STUDENT
        // -----------------------------------------

        Long studentId =
                registration.getStudent()
                        .getUserId();

        return certificateRepository
                .findByEvent_EventId(eventId)
                .stream()
                .filter(certificate ->
                        certificate.getStudent()
                                .getUserId()
                                .equals(studentId)
                )
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "Certificate not found for this student"
                        )
                );
    }

    // =========================================
    // GET ALL CERTIFICATES FOR A STUDENT
    // =========================================

    public List<Certificate> getStudentCertificates(
            Long studentId) {

        User student =
                userRepository.findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found"
                                )
                        );

        if (!"STUDENT".equals(
                student.getRole())) {

            throw new RuntimeException(
                    "User is not a student"
            );
        }

        return certificateRepository
                .findByStudent_UserId(studentId);
    }

    // =========================================
    // GET CERTIFICATES FOR AN EVENT
    // =========================================

    public List<Certificate> getEventCertificates(
            Long eventId,
            Long coordinatorId) {

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                )
                        );

        // -----------------------------------------
        // VERIFY COORDINATOR OWNS EVENT
        // -----------------------------------------

        if (event.getCoordinator() == null ||
                !event.getCoordinator()
                        .getUserId()
                        .equals(coordinatorId)) {

            throw new RuntimeException(
                    "You are not authorized to view certificates for this event"
            );
        }

        return certificateRepository
                .findByEvent_EventId(eventId);
    }

    // =========================================
    // GET SINGLE STUDENT CERTIFICATE
    // =========================================

    public Certificate getStudentCertificate(
            Long certificateId,
            Long studentId) {

        Certificate certificate =
                certificateRepository
                        .findById(certificateId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certificate not found"
                                )
                        );

        // -----------------------------------------
        // VERIFY CERTIFICATE BELONGS TO STUDENT
        // -----------------------------------------

        if (!certificate.getStudent()
                .getUserId()
                .equals(studentId)) {

            throw new RuntimeException(
                    "You are not authorized to view this certificate"
            );
        }

        return certificate;
    }
}