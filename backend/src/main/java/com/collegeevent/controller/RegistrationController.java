package com.collegeevent.controller;

import com.collegeevent.dto.AttendanceResponse;
import com.collegeevent.dto.RegistrationResponse;
import com.collegeevent.entity.Attendance;
import com.collegeevent.entity.Registration;
import com.collegeevent.service.AttendanceService;
import com.collegeevent.service.RegistrationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final AttendanceService attendanceService;

    public RegistrationController(
            RegistrationService registrationService,
            AttendanceService attendanceService) {

        this.registrationService =
                registrationService;

        this.attendanceService =
                attendanceService;
    }

    // =========================================
    // STUDENT REGISTRATION
    // =========================================

    @PostMapping("/student/registrations")
    public ResponseEntity<?> registerStudent(
            @RequestParam Long studentId,
            @RequestParam Long eventId) {

        try {

            Registration registration =
                    registrationService.registerStudent(
                            studentId,
                            eventId
                    );

            return ResponseEntity.ok(
                    new RegistrationResponse(registration)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    // =========================================
    // STUDENT - MY REGISTRATIONS
    // =========================================

    @GetMapping("/student/registrations")
    public ResponseEntity<?> getStudentRegistrations(
            @RequestParam Long studentId) {

        try {

            List<RegistrationResponse> registrations =
                    registrationService
                            .getStudentRegistrations(studentId)
                            .stream()
                            .map(RegistrationResponse::new)
                            .toList();

            return ResponseEntity.ok(registrations);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    // =========================================
    // STUDENT - CANCEL REGISTRATION
    // =========================================

    @DeleteMapping(
            "/student/registrations/{registrationId}"
    )
    public ResponseEntity<?> cancelRegistration(
            @PathVariable Long registrationId,
            @RequestParam Long studentId) {

        try {

            registrationService.cancelRegistration(
                    registrationId,
                    studentId
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Registration cancelled successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    // =========================================
    // COORDINATOR - VIEW PARTICIPANTS
    // =========================================

    @GetMapping(
            "/coordinator/events/{eventId}/participants"
    )
    public ResponseEntity<?> getEventParticipants(
            @PathVariable Long eventId,
            @RequestParam Long coordinatorId) {

        try {

            List<RegistrationResponse> participants =
                    registrationService
                            .getEventParticipants(
                                    eventId,
                                    coordinatorId
                            )
                            .stream()
                            .map(RegistrationResponse::new)
                            .toList();

            return ResponseEntity.ok(participants);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    // =========================================
    // COORDINATOR - MARK ATTENDANCE
    // =========================================

    @PutMapping(
            "/coordinator/events/{eventId}/attendance/{registrationId}"
    )
    public ResponseEntity<?> markAttendance(
            @PathVariable Long eventId,
            @PathVariable Long registrationId,
            @RequestParam Long coordinatorId,
            @RequestParam String status) {

        try {

            Attendance attendance =
                    attendanceService.markAttendance(
                            eventId,
                            registrationId,
                            coordinatorId,
                            status.toUpperCase()
                    );

            return ResponseEntity.ok(
                    new AttendanceResponse(attendance)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    // =========================================
    // COORDINATOR - ATTENDANCE HISTORY
    // =========================================

    @GetMapping(
            "/coordinator/events/{eventId}/attendance"
    )
    public ResponseEntity<?> getEventAttendance(
            @PathVariable Long eventId,
            @RequestParam Long coordinatorId) {

        try {

            List<AttendanceResponse> attendance =
                    attendanceService
                            .getEventAttendance(
                                    eventId,
                                    coordinatorId
                            )
                            .stream()
                            .map(AttendanceResponse::new)
                            .toList();

            return ResponseEntity.ok(attendance);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }
}