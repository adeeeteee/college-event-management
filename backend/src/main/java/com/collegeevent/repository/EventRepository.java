package com.collegeevent.repository;

import com.collegeevent.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository
        extends JpaRepository<Event, Long> {

    List<Event> findByCoordinator_UserId(
            Long coordinatorId
    );
}