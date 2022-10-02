package com.gardenshare.backend.model;

import java.util.List;

public record GardenLocationDetails(String id,
                                    Float GardenSize,
                                    Location location,
                                    Boolean isAvailable,
                                    String description,
                                    String title,
                                    Properties info,
                                    List<String> images) {
    public record Properties(String type,
                             String light,
                             Boolean ownerWaters,
                             Boolean hasPets,
                             Boolean providesSoil,
                             Boolean providesFertilizer,
                             Boolean providesPestControl) {
    }
}
