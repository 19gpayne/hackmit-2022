import {axiosRequest} from "../utils/apis";
import { devListingData, devOneListingData } from "../static/dev";

export const tryGetRelevantListings = (latitude, longitude, milesRadius) => {
    return async dispatch => {
        return await axiosRequest('http://localhost:8080/gardens', "GET", {latitude: latitude, longitude: longitude, milesRadius: milesRadius}, devListingData);
    }
};

export const tryGetListing = (id) => {
    return async dispatch => {
        const listing = await axiosRequest('http://localhost:8080/garden', "GET", {id: id}, devOneListingData);
        console.log(listing)
        return listing
    }
};