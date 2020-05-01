import {SET_USER_DATA} from "./actions";

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    payload: {
        userData
    }
});
