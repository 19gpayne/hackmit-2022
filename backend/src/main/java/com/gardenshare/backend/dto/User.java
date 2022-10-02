package com.gardenshare.backend.dto;

import javax.persistence.*;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String profileImage;

    @OneToMany(mappedBy = "owner")
    private Set<GardenLocation> gardenLocations;

    public User() {}

    public User(String name, String email, String password, String profileImage, Set<GardenLocation> gardenLocations) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.gardenLocations = gardenLocations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Set<GardenLocation> getGardenLocations() {
        return gardenLocations;
    }

    public void setGardenLocations(Set<GardenLocation> gardenLocations) {
        this.gardenLocations = gardenLocations;
    }
}