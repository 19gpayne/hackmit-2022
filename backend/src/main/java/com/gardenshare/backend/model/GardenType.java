package com.gardenshare.backend.model;

public enum GardenType {
    INDOOR("Indoor"),
    OUTDOOR_PLOT("Outdoor plot"),
    BACKYARD("Entire backyard"),
    OTHER("Other/unknown");

    public final String displayText;

    GardenType(String displayText) {
        this.displayText = displayText;
    }

    public static GardenType from(String string) {
        switch (string.toLowerCase().trim()) {
            case "indoor", "indoors" -> {
                return GardenType.INDOOR;
            }
            case "outdoorplot", "outdoor_plot", "outdoor", "outdoors" -> {
                return GardenType.OUTDOOR_PLOT;
            }
            case "backyard" -> {
                return GardenType.BACKYARD;
            }
            default -> {
                return GardenType.OTHER;
            }
        }
    }

    @Override
    public String toString() {
        return displayText;
    }
}
