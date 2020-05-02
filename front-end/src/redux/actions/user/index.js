import {SET_USER_DATA, SET_USER_INVITATIONS_DATA} from "./actions";

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    payload: {
        userData
    }
});

export const setUserInvitations = (invitations) => ({
    type: SET_USER_INVITATIONS_DATA,
    payload: {
        invitations
    }
});
