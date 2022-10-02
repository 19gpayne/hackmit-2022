package com.gardenshare.backend.model;

public enum LightAmount {
    DIRECT_SUNLIGHT("Direct"),
    INDIRECT_SUNLIGHT("Bright indirect"),
    LOW_LIGHT("Low"),
    OTHER("Other/unknown");

    public final String displayText;

    LightAmount(String displayText) {
        this.displayText = displayText;
    }

    public static LightAmount from(String string) {
        switch (string.toLowerCase().trim()) {
            case "directsunlight", "direct_sunlight", "direct", "direct sunlight", "direct light"-> {
                return LightAmount.DIRECT_SUNLIGHT;
            }
            case "indirectsunlight", "indirect_sunlight", "indirect", "indirect sunlight", "indirect light" -> {
                return LightAmount.INDIRECT_SUNLIGHT;
            }
            case "lowlight", "low_light", "low light" -> {
                return LightAmount.LOW_LIGHT;
            }
            default -> {
                return LightAmount.OTHER;
            }
        }
    }

    @Override
    public String toString() {
        return displayText;
    }
}
