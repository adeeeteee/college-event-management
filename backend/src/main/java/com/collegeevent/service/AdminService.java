package com.collegeevent.service;

import com.collegeevent.dto.AdminDashboardResponse;
import com.collegeevent.dto.EventResponse;
import com.collegeevent.dto.RegistrationResponse;
import com.collegeevent.dto.UserResponse;

import com.collegeevent.entity.Registration;
import com.collegeevent.entity.User;

import com.collegeevent.repository.AttendanceRepository;
import com.collegeevent.repository.CertificateRepository;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.RegistrationRepository;
import com.collegeevent.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    private final AttendanceRepository attendanceRepository;
    private final CertificateRepository certificateRepository;

    public AdminService(
            UserRepository userRepository,
            EventRepository eventRepository,
            RegistrationRepository registrationRepository,
            AttendanceRepository attendanceRepository,
            CertificateRepository certificateRepository) {

        this.userRepository =
                userRepository;

        this.eventRepository =
                eventRepository;

        this.registrationRepository =
                registrationRepository;

        this.attendanceRepository =
                attendanceRepository;

        this.certificateRepository =
                certificateRepository;
    }


    // =========================================
    // DASHBOARD STATISTICS
    // =========================================

    public AdminDashboardResponse getDashboardStatistics() {

        long totalUsers =
                userRepository.count();

        long totalStudents =
                userRepository.countByRole("STUDENT");

        long totalCoordinators =
                userRepository.countByRole("COORDINATOR");

        long totalAdmins =
                userRepository.countByRole("ADMIN");

        long totalEvents =
                eventRepository.count();

        long totalRegistrations =
                registrationRepository.count();

        long presentAttendance =
                attendanceRepository.countByStatus(
                        "PRESENT"
                );

        long absentAttendance =
                attendanceRepository.countByStatus(
                        "ABSENT"
                );

        long totalCertificates =
                certificateRepository.count();


        return new AdminDashboardResponse(
                totalUsers,
                totalStudents,
                totalCoordinators,
                totalAdmins,
                totalEvents,
                totalRegistrations,
                presentAttendance,
                absentAttendance,
                totalCertificates
        );
    }


    // =========================================
    // GET ALL USERS
    // =========================================

    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(UserResponse::new)
                .toList();
    }


    // =========================================
    // GET ALL EVENTS
    // =========================================

    public List<EventResponse> getAllEvents() {

        return eventRepository
                .findAll()
                .stream()
                .map(EventResponse::new)
                .toList();
    }


    // =========================================
    // GET ALL REGISTRATIONS
    // =========================================

    public List<RegistrationResponse>
    getAllRegistrations() {

        return registrationRepository
                .findAll()
                .stream()
                .map(RegistrationResponse::new)
                .toList();
    }


    // =========================================
    // GET USERS BY ROLE
    // =========================================

    public List<UserResponse>
    getUsersByRole(String role) {

        return userRepository
                .findAll()
                .stream()
                .filter(user ->
                        role.equalsIgnoreCase(
                                user.getRole()
                        )
                )
                .map(UserResponse::new)
                .toList();
    }
}
