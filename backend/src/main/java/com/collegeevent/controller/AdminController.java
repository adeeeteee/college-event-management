package com.collegeevent.controller;

import com.collegeevent.dto.AdminDashboardResponse;
import com.collegeevent.dto.EventResponse;
import com.collegeevent.dto.RegistrationResponse;
import com.collegeevent.dto.UserResponse;

import com.collegeevent.service.AdminService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(
            AdminService adminService) {

        this.adminService =
                adminService;
    }


    // =========================================
    // ADMIN DASHBOARD STATISTICS
    // =========================================

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {

        try {

            AdminDashboardResponse response =
                    adminService
                            .getDashboardStatistics();

            return ResponseEntity.ok(
                    response
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
    // ADMIN - ALL USERS
    // =========================================

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {

        try {

            List<UserResponse> users =
                    adminService.getAllUsers();

            return ResponseEntity.ok(
                    users
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
    // ADMIN - STUDENTS
    // =========================================

    @GetMapping("/users/students")
    public ResponseEntity<?> getStudents() {

        try {

            return ResponseEntity.ok(
                    adminService.getUsersByRole(
                            "STUDENT"
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
    // ADMIN - COORDINATORS
    // =========================================

    @GetMapping("/users/coordinators")
    public ResponseEntity<?> getCoordinators() {

        try {

            return ResponseEntity.ok(
                    adminService.getUsersByRole(
                            "COORDINATOR"
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
    // ADMIN - ALL EVENTS
    // =========================================

    @GetMapping("/events")
    public ResponseEntity<?> getAllEvents() {

        try {

            List<EventResponse> events =
                    adminService.getAllEvents();

            return ResponseEntity.ok(
                    events
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
    // ADMIN - ALL REGISTRATIONS
    // =========================================

    @GetMapping("/registrations")
    public ResponseEntity<?> getAllRegistrations() {

        try {

            List<RegistrationResponse> registrations =
                    adminService.getAllRegistrations();

            return ResponseEntity.ok(
                    registrations
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