package com.gardenshare.backend.dto;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class GardenLocationRowMapper implements RowMapper<GardenLocation> {
    @Override
    public GardenLocation mapRow(ResultSet resultSet, int i) throws SQLException {

        /*return new GardenLocation(resultSet.getLong("GardenId"),
                resultSet.getFloat("GardenSize"),
                resultSet.getString("City"),
                resultSet.getString("State"),
                resultSet.getString("zipcode"),
                resultSet.getFloat("Latitude"),
                resultSet.getFloat("Longitude"),
                resultSet.getBoolean("isAvailable"),
                resultSet.getString("description"),
                resultSet.getString("type"),
                resultSet.getString("light"),
                resultSet.getBoolean("ownerCare"),
                resultSet.getBoolean("hasPets"),
                resultSet.getBoolean("providesSoil"),
                resultSet.getBoolean("providesFertilizer"),
                resultSet.getBoolean("providesPestControl"),
                resultSet.getString("title"),
                resultSet.getString("images"),
                resultSet.getString("frontImage"),
                resultSet.getString("owner"));*/
        return null;
    }
}
