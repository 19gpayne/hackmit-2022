import {axiosRequest} from "../utils/apis";
import {setUserData} from '../store/reducer';
import { devUserData } from "../static/dev";

export const tryLoginUser = (email, password) => {
    return async dispatch => {
        const user = await axiosRequest('', "POST", {email: email, password: password}, devUserData);
        await dispatch(setUserData(user));
        return user;
    }
};

export const tryCreateUser = (name, email, password) => {
    return async dispatch => {
        const user = await axiosRequest('', "POST", {name: name, email: email, password: password}, devUserData);
        await dispatch(setUserData(user));
        return user;
    }
};