package com.collegeevent.dto;

import com.collegeevent.entity.User;

public class UserResponse {

    private Long userId;
    private String name;
    private String email;
    private String role;

    public UserResponse(User user) {

        this.userId =
                user.getUserId();

        this.name =
                user.getName();

        this.email =
                user.getEmail();

        this.role =
                user.getRole();
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}