import {axiosRequest} from "../utils/apis";
import { devListingData, devOneListingData } from "../static/dev";

export const tryGetRelevantListings = (latitude, longitude, milesRadius) => {
    return async dispatch => {
        return await axiosRequest('https://virtserver.swaggerhub.com/ISABELLABIRD19/GardenShare/1.0.0/garden', "GET", {latitude: latitude, longitude: longitude, milesRadius: milesRadius}, devListingData);
    }
};

export const tryGetListing = (id) => {
    return async dispatch => {
        const listing = await axiosRequest('https://virtserver.swaggerhub.com/ISABELLABIRD19/GardenShare/1.0.0/garden', "GET", {id: id}, devOneListingData);
        console.log(listing[0])
        return listing[0]
    }
};