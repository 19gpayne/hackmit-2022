package com.gardenshare.backend.dto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GardenLocationRepository extends JpaRepository<GardenLocation, Long> {

    GardenLocation findGardenLocationByGardenId(Long id);

    @Query(value = "SELECT * FROM garden_locations WHERE user_id = ?1",
    nativeQuery = true)
    List<GardenLocation> findAllBy(Long userId);

    // ATTRIBUTION: Formula from https://stackoverflow.com/a/32676224
    @Query(value = "SELECT * FROM(SELECT *,(((acos(sin(( ?1 *pi()/180)) * sin((Latitude*pi()/180))" +
                    "+cos(( ?1 *pi()/180)) * cos((Latitude*pi()/180)) * cos((( ?2 - Longitude)*pi()/180))))" +
                    "*180/pi())*60*1.1515*1.609344) as distance FROM garden_locations) t " +
                    "WHERE distance <= (?3 * 0.621371);",
            nativeQuery = true)
    List<GardenLocation> findAllByRangedLatitudeAndLongitude(Float lat, Float lon, Float radiusMiles);
}
