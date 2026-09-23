package com.collegeevent.dto;

public class AdminDashboardResponse {

    private long totalUsers;
    private long totalStudents;
    private long totalCoordinators;
    private long totalAdmins;

    private long totalEvents;
    private long totalRegistrations;

    private long presentAttendance;
    private long absentAttendance;

    private long totalCertificates;

    public AdminDashboardResponse(
            long totalUsers,
            long totalStudents,
            long totalCoordinators,
            long totalAdmins,
            long totalEvents,
            long totalRegistrations,
            long presentAttendance,
            long absentAttendance,
            long totalCertificates) {

        this.totalUsers = totalUsers;
        this.totalStudents = totalStudents;
        this.totalCoordinators = totalCoordinators;
        this.totalAdmins = totalAdmins;

        this.totalEvents = totalEvents;
        this.totalRegistrations = totalRegistrations;

        this.presentAttendance = presentAttendance;
        this.absentAttendance = absentAttendance;

        this.totalCertificates = totalCertificates;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public long getTotalCoordinators() {
        return totalCoordinators;
    }

    public long getTotalAdmins() {
        return totalAdmins;
    }

    public long getTotalEvents() {
        return totalEvents;
    }

    public long getTotalRegistrations() {
        return totalRegistrations;
    }

    public long getPresentAttendance() {
        return presentAttendance;
    }

    public long getAbsentAttendance() {
        return absentAttendance;
    }

    public long getTotalCertificates() {
        return totalCertificates;
    }
}