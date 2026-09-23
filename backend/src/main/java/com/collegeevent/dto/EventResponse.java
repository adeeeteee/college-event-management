package com.collegeevent.dto;

import com.collegeevent.entity.Event;

import java.time.LocalDate;
import java.time.LocalTime;

public class EventResponse {

    private Long eventId;
    private String name;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String venue;
    private Integer capacity;
    private Long coordinatorId;
    private String coordinatorName;

    public EventResponse(Event event) {

        this.eventId = event.getEventId();
        this.name = event.getName();
        this.description = event.getDescription();
        this.date = event.getDate();
        this.time = event.getTime();
        this.venue = event.getVenue();
        this.capacity = event.getCapacity();

        if (event.getCoordinator() != null) {
            this.coordinatorId = event.getCoordinator().getUserId();
            this.coordinatorName = event.getCoordinator().getName();
        }
    }

    public Long getEventId() {
        return eventId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    public String getVenue() {
        return venue;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Long getCoordinatorId() {
        return coordinatorId;
    }

    public String getCoordinatorName() {
        return coordinatorName;
    }
}
