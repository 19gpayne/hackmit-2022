package com.gardenshare.backend.controller;


import com.gardenshare.backend.converters.ModelToClientDetailsConverter;
import com.gardenshare.backend.converters.ModelToClientInfoConverter;
import com.gardenshare.backend.dto.GardenLocation;
import com.gardenshare.backend.dto.GardenLocationRepository;
import com.gardenshare.backend.dto.UserRepository;
import com.gardenshare.backend.model.GardenLocationDetails;
import com.gardenshare.backend.model.GardenLocationInfo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class GardenSearchController {

    private final GardenLocationRepository repository;
    private final UserRepository userRepository;

    public GardenSearchController(GardenLocationRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }


    @GetMapping("/garden")
    public GardenLocationDetails getGarden(@RequestParam(value="id", defaultValue = "test") Long id) {
        return ModelToClientDetailsConverter.convert(repository.findGardenLocationByGardenId(id));
    }

    @PostMapping("/garden")
    public GardenLocationDetails createGarden(@RequestBody GardenLocation location) {
        return ModelToClientDetailsConverter.convert(repository.save(location));
    }

    @GetMapping("/gardens")
    public List<GardenLocationInfo> getGardens(@RequestParam(value="latitude") Float lat,
                                               @RequestParam(value="longitude") Float lon,
                                               @RequestParam(value="milesRadius") Float radius) {

        return repository.findAllByRangedLatitudeAndLongitude(lat, lon, radius).stream()
                .map(ModelToClientInfoConverter::convert)
                .toList();
    }

    @PostMapping("/user/{userId}/gardens")
    public GardenLocation createGarden(@PathVariable(value = "userId") Long userId, @RequestBody GardenLocation gardenLocation)
            throws RuntimeException {
        return userRepository.findById(userId)
                .map(user -> {gardenLocation.setOwner(user);
                    return repository.save(gardenLocation);
        }).orElseThrow(() -> new RuntimeException("user not found"));
    }

    @GetMapping("user/{userId}/gardens")
    public List<GardenLocation> getGardensForUser(@PathVariable(value="userId") Long userId) {
        return repository.findAllBy(userId);
    }

}
