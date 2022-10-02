package com.gardenshare.backend.dto;

import java.util.List;

public record GardenLocationOld(String id,
                             Float GardenSize,
                             String City,
                             String State,
                             String zipcode,
                             Float Latitude,
                             Float Longitude,
                             Boolean isAvailable,
                             String description,
                             String type,
                             String light,
                             Boolean ownerCare,
                             Boolean hasPets,
                             Boolean providesSoil,
                             Boolean providesFertilizer,
                             Boolean providesPestControl,
                             String title,
                             List<String> images,
                             String frontImage) {
}
