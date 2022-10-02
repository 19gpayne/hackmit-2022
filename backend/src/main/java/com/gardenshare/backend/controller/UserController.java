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

    @PostMapping("/userLogin")
    ResponseEntity<User> getUser(@RequestBody UserLogin userLogin) {
        Optional<User> user = repository.findUserBy(userLogin.email, userLogin.password);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.of(user);
    }

    private static class UserLogin {
        private String email;
        private String password;

        public UserLogin(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @PostMapping("/user")
    User newUser(@RequestBody User user) {
        return repository.save(user);
    }
}
