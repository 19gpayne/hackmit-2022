package com.gardenshare.backend.converters;

import com.gardenshare.backend.dto.GardenLocation;
import com.gardenshare.backend.model.*;

import java.util.List;

public class ModelToClientDetailsConverter {

    public static GardenLocationDetails convert(GardenLocation source) {
        Location location = new Location();
        location.setCity(source.getCity());
        location.setState(source.getState());
        location.setZipcode(source.getZipcode());
        location.setCoordinates(new GeoCoordinates(source.getLatitude(), source.getLongitude()));

        return new GardenLocationDetails(String.valueOf(source.getGardenId()),
                source.getGardenSize(),
                location,
                source.getIsAvailable(),
                source.getDescription(),
                source.getTitle(),
                new GardenLocationDetails.Properties(GardenType.from(source.getType()).toString(),
                        LightAmount.from(source.getLight()).toString(),
                        source.getOwnerCare(),
                        source.getHasPets(),
                        source.getProvidesSoil(),
                        source.getProvidesFertilizer(),
                        source.getProvidesPestControl()),
                source.getImages() != null ? List.of(source.getImages().split(" ")) : List.of());
    }
}
