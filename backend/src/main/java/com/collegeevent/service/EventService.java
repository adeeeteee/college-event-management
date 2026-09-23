package com.collegeevent.service;

import com.collegeevent.entity.Event;
import com.collegeevent.entity.User;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(
            EventRepository eventRepository,
            UserRepository userRepository) {

        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    // Create a new event
    public Event createEvent(Event event, Long coordinatorId) {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() ->
                        new RuntimeException("Coordinator not found"));

        if (!"COORDINATOR".equals(coordinator.getRole())) {
            throw new RuntimeException(
                    "Only a coordinator can create an event");
        }

        event.setCoordinator(coordinator);

        return eventRepository.save(event);
    }

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get events created by a specific coordinator
    public List<Event> getEventsByCoordinator(Long coordinatorId) {

        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() ->
                        new RuntimeException("Coordinator not found"));

        if (!"COORDINATOR".equals(coordinator.getRole())) {
            throw new RuntimeException(
                    "User is not a coordinator");
        }

        return eventRepository.findByCoordinator_UserId(coordinatorId);
    }

    // Get event by ID
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    // Update an event
    public Event updateEvent(Long eventId, Event updatedEvent) {

        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        existingEvent.setName(updatedEvent.getName());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setDate(updatedEvent.getDate());
        existingEvent.setTime(updatedEvent.getTime());
        existingEvent.setVenue(updatedEvent.getVenue());
        existingEvent.setCapacity(updatedEvent.getCapacity());

        return eventRepository.save(existingEvent);
    }

    // Delete an event
    public void deleteEvent(Long eventId) {

        if (!eventRepository.existsById(eventId)) {
            throw new RuntimeException("Event not found");
        }

        eventRepository.deleteById(eventId);
    }
}