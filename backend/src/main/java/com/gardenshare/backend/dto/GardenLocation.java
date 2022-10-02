package com.gardenshare.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "garden_locations")
@JsonIgnoreProperties(value= {"owner"})
public class GardenLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gardenId;
    private Float GardenSize;
    private String City;
    private String State;
    private String zipcode;
    private Float Latitude;
    private Float Longitude;
    private Boolean isAvailable;
    @Lob
    private String description;
    private String type;
    private String light;
    private Boolean ownerCare;
    private Boolean hasPets;
    private Boolean providesSoil;
    private Boolean providesFertilizer;
    private Boolean providesPestControl;
    private String title;
    @Lob
    private String images;
    private String frontImage;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User owner;

    public Float getGardenSize() {
        return GardenSize;
    }

    public void setGardenSize(Float gardenSize) {
        GardenSize = gardenSize;
    }

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }

    public String getState() {
        return State;
    }

    public void setState(String state) {
        State = state;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public Float getLatitude() {
        return Latitude;
    }

    public void setLatitude(Float latitude) {
        Latitude = latitude;
    }

    public Float getLongitude() {
        return Longitude;
    }

    public void setLongitude(Float longitude) {
        Longitude = longitude;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLight() {
        return light;
    }

    public void setLight(String light) {
        this.light = light;
    }

    public Boolean getOwnerCare() {
        return ownerCare;
    }

    public void setOwnerCare(Boolean ownerCare) {
        this.ownerCare = ownerCare;
    }

    public Boolean getHasPets() {
        return hasPets;
    }

    public void setHasPets(Boolean hasPets) {
        this.hasPets = hasPets;
    }

    public Boolean getProvidesSoil() {
        return providesSoil;
    }

    public void setProvidesSoil(Boolean providesSoil) {
        this.providesSoil = providesSoil;
    }

    public Boolean getProvidesFertilizer() {
        return providesFertilizer;
    }

    public void setProvidesFertilizer(Boolean providesFertilizer) {
        this.providesFertilizer = providesFertilizer;
    }

    public Boolean getProvidesPestControl() {
        return providesPestControl;
    }

    public void setProvidesPestControl(Boolean providesPestControl) {
        this.providesPestControl = providesPestControl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getFrontImage() {
        return frontImage;
    }

    public void setFrontImage(String frontImage) {
        this.frontImage = frontImage;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
