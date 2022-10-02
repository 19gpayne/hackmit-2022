package com.gardenshare.backend.dto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM user where email=?1 and password=?2",
    nativeQuery = true)
    Optional<User> findUserBy(String email, String password);

}
