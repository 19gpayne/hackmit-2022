package com.gardenshare.backend.converters;

import com.gardenshare.backend.dto.GardenLocation;
import com.gardenshare.backend.model.GardenLocationInfo;
import com.gardenshare.backend.model.GeoCoordinates;
import com.gardenshare.backend.model.Location;

public class ModelToClientInfoConverter {

    public static GardenLocationInfo convert(GardenLocation source) {
        Location location = new Location();
        location.setCity(source.getCity());
        location.setState(source.getState());
        location.setZipcode(source.getZipcode());
        location.setCoordinates(new GeoCoordinates(source.getLatitude(), source.getLongitude()));

        return new GardenLocationInfo(String.valueOf(source.getGardenId()),
                "test",
                source.getGardenSize(),
                source.getTitle(),
                source.getFrontImage(),
                location);
    }
}
