package com.collegeevent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RoleTestController {

    @GetMapping("/student/test")
    public ResponseEntity<String> studentTest() {
        return ResponseEntity.ok("Student access granted!");
    }

    @GetMapping("/coordinator/test")
    public ResponseEntity<String> coordinatorTest() {
        return ResponseEntity.ok("Coordinator access granted!");
    }

    @GetMapping("/admin/test")
    public ResponseEntity<String> adminTest() {
        return ResponseEntity.ok("Administrator access granted!");
    }
}
