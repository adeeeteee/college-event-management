package com.collegeevent.controller;

import com.collegeevent.dto.CertificateResponse;
import com.collegeevent.entity.Certificate;
import com.collegeevent.service.CertificateService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(
            CertificateService certificateService) {

        this.certificateService =
                certificateService;
    }

    // =========================================
    // COORDINATOR - GENERATE CERTIFICATE
    // =========================================

    @PostMapping(
            "/coordinator/events/{eventId}/certificates/{registrationId}"
    )
    public ResponseEntity<?> generateCertificate(
            @PathVariable Long eventId,
            @PathVariable Long registrationId,
            @RequestParam Long coordinatorId) {

        try {

            Certificate certificate =
                    certificateService.generateCertificate(
                            eventId,
                            registrationId,
                            coordinatorId
                    );

            return ResponseEntity.ok(
                    new CertificateResponse(certificate)
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
    // COORDINATOR - VIEW SINGLE CERTIFICATE
    // =========================================

    @GetMapping(
            "/coordinator/events/{eventId}/certificates/{registrationId}"
    )
    public ResponseEntity<?> getCoordinatorCertificate(
            @PathVariable Long eventId,
            @PathVariable Long registrationId,
            @RequestParam Long coordinatorId) {

        try {

            Certificate certificate =
                    certificateService.getCoordinatorCertificate(
                            eventId,
                            registrationId,
                            coordinatorId
                    );

            return ResponseEntity.ok(
                    new CertificateResponse(certificate)
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
    // COORDINATOR - VIEW EVENT CERTIFICATES
    // =========================================

    @GetMapping(
            "/coordinator/events/{eventId}/certificates"
    )
    public ResponseEntity<?> getEventCertificates(
            @PathVariable Long eventId,
            @RequestParam Long coordinatorId) {

        try {

            List<CertificateResponse> certificates =
                    certificateService
                            .getEventCertificates(
                                    eventId,
                                    coordinatorId
                            )
                            .stream()
                            .map(CertificateResponse::new)
                            .toList();

            return ResponseEntity.ok(certificates);

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
    // STUDENT - VIEW MY CERTIFICATES
    // =========================================

    @GetMapping(
            "/student/certificates"
    )
    public ResponseEntity<?> getStudentCertificates(
            @RequestParam Long studentId) {

        try {

            List<CertificateResponse> certificates =
                    certificateService
                            .getStudentCertificates(
                                    studentId
                            )
                            .stream()
                            .map(CertificateResponse::new)
                            .toList();

            return ResponseEntity.ok(certificates);

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
    // STUDENT - VIEW SINGLE CERTIFICATE
    // =========================================

    @GetMapping(
            "/student/certificates/{certificateId}"
    )
    public ResponseEntity<?> getStudentCertificate(
            @PathVariable Long certificateId,
            @RequestParam Long studentId) {

        try {

            Certificate certificate =
                    certificateService
                            .getStudentCertificate(
                                    certificateId,
                                    studentId
                            );

            return ResponseEntity.ok(
                    new CertificateResponse(certificate)
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
}