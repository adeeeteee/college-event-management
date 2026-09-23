package com.collegeevent.service;

import com.collegeevent.entity.User;
import com.collegeevent.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Create a new user with encrypted password
    public User createUser(User user) {

        String encryptedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(encryptedPassword);

        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Find user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}