package com.collegeevent.controller;

import com.collegeevent.dto.EventResponse;
import com.collegeevent.entity.Event;
import com.collegeevent.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // Create event - Coordinator only
    @PostMapping("/coordinator/events")
    public ResponseEntity<EventResponse> createEvent(
            @RequestBody Event event,
            @RequestParam Long coordinatorId) {

        Event createdEvent =
                eventService.createEvent(event, coordinatorId);

        return ResponseEntity.ok(
                new EventResponse(createdEvent)
        );
    }

    // Get events created by a specific coordinator
    @GetMapping("/coordinator/events")
    public ResponseEntity<List<EventResponse>> getCoordinatorEvents(
            @RequestParam Long coordinatorId) {

        List<EventResponse> events =
                eventService.getEventsByCoordinator(coordinatorId)
                        .stream()
                        .map(EventResponse::new)
                        .toList();

        return ResponseEntity.ok(events);
    }

    // Get all events
    @GetMapping("/events")
    public ResponseEntity<List<EventResponse>> getAllEvents() {

        List<EventResponse> events =
                eventService.getAllEvents()
                        .stream()
                        .map(EventResponse::new)
                        .toList();

        return ResponseEntity.ok(events);
    }

    // Get event by ID
    @GetMapping("/events/{eventId}")
    public ResponseEntity<EventResponse> getEventById(
            @PathVariable Long eventId) {

        return eventService.getEventById(eventId)
                .map(EventResponse::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an event - Coordinator only
    @PutMapping("/coordinator/events/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long eventId,
            @RequestBody Event event) {

        Event updatedEvent =
                eventService.updateEvent(eventId, event);

        return ResponseEntity.ok(
                new EventResponse(updatedEvent)
        );
    }

    // Delete an event - Coordinator only
    @DeleteMapping("/coordinator/events/{eventId}")
    public ResponseEntity<String> deleteEvent(
            @PathVariable Long eventId) {

        eventService.deleteEvent(eventId);

        return ResponseEntity.ok(
                "Event deleted successfully"
        );
    }
}