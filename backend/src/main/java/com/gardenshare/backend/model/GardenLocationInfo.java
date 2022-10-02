package com.gardenshare.backend.model;

public record GardenLocationInfo(String id,
                                 String ownerId,
                                 Float gardenUnits,
                                 String title,
                                 String image,
                                 Location location) { }
