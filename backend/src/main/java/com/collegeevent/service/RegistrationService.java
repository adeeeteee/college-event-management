package com.collegeevent.service;

import com.collegeevent.entity.Event;
import com.collegeevent.entity.Registration;
import com.collegeevent.entity.User;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.RegistrationRepository;
import com.collegeevent.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {

        this.registrationRepository =
                registrationRepository;

        this.userRepository =
                userRepository;

        this.eventRepository =
                eventRepository;
    }

    public Registration registerStudent(
            Long studentId,
            Long eventId) {

        User student =
                userRepository.findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found"
                                ));

        if (!"STUDENT".equals(student.getRole())) {

            throw new RuntimeException(
                    "Only students can register for events"
            );
        }

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                ));

        var existingRegistration =
                registrationRepository
                        .findByStudent_UserIdAndEvent_EventId(
                                studentId,
                                eventId
                        );

        if (existingRegistration.isPresent()) {

            Registration registration =
                    existingRegistration.get();

            if ("REGISTERED".equals(
                    registration.getStatus())) {

                throw new RuntimeException(
                        "You are already registered for this event"
                );
            }

            if ("CANCELLED".equals(
                    registration.getStatus())) {

                long registeredCount =
                        registrationRepository
                                .countByEvent_EventId(eventId);

                if (registeredCount >= event.getCapacity()) {

                    throw new RuntimeException(
                            "Event capacity is full"
                    );
                }

                registration.setStatus("REGISTERED");

                registration.setRegistrationDate(
                        LocalDateTime.now()
                );

                return registrationRepository.save(
                        registration
                );
            }
        }

        long registeredCount =
                registrationRepository
                        .countByEvent_EventId(eventId);

        if (registeredCount >= event.getCapacity()) {

            throw new RuntimeException(
                    "Event capacity is full"
            );
        }

        Registration registration =
                new Registration(
                        student,
                        event,
                        LocalDateTime.now(),
                        "REGISTERED"
                );

        return registrationRepository.save(
                registration
        );
    }

    public List<Registration> getStudentRegistrations(
            Long studentId) {

        User student =
                userRepository.findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found"
                                ));

        if (!"STUDENT".equals(student.getRole())) {

            throw new RuntimeException(
                    "User is not a student"
            );
        }

        return registrationRepository
                .findByStudent_UserId(studentId);
    }

    public void cancelRegistration(
            Long registrationId,
            Long studentId) {

        Registration registration =
                registrationRepository
                        .findByRegistrationIdAndStudent_UserId(
                                registrationId,
                                studentId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Registration not found"
                                ));

        if (!"REGISTERED".equals(
                registration.getStatus())) {

            throw new RuntimeException(
                    "Registration is already cancelled"
            );
        }

        registration.setStatus("CANCELLED");

        registrationRepository.save(
                registration
        );
    }

    public List<Registration> getEventParticipants(
            Long eventId,
            Long coordinatorId) {

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"
                                ));

        if (event.getCoordinator() == null ||
                !event.getCoordinator()
                        .getUserId()
                        .equals(coordinatorId)) {

            throw new RuntimeException(
                    "You are not authorized to view participants for this event"
            );
        }

        return registrationRepository
                .findByEvent_EventId(eventId)
                .stream()
                .filter(registration ->
                        "REGISTERED".equals(
                                registration.getStatus()
                        ))
                .toList();
    }
}