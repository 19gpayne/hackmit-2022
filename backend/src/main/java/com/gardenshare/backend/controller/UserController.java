package com.gardenshare.backend.controller;


import com.gardenshare.backend.dto.User;
import com.gardenshare.backend.dto.UserRepository;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/user/{id}")
    ResponseEntity<User> getUserFromId(@PathVariable(value = "id") Long id) {
        Optional<User> user = repository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.of(user);
    }

    @GetMapping("/user")
    ResponseEntity<User> getUser(@RequestParam(value="email") String email, @RequestParam(value="password") String password) {
        Optional<User> user = repository.findUserBy(email, password);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.of(user);
    }

    @PostMapping("/user")
    User newUser(@RequestBody User user) {
        return repository.save(user);
    }
}
