import {
    ADD_USER_TO_INVITE_TO_LIST,
    REMOVE_USER_FROM_INVITATIONS_LIST,
    REMOVE_USER_FROM_INVITATIONS_LIT,
    RESET_INVITATIONS_DATA, SET_ERROR_SENT_INVITATION,
    SET_SEARCH_USER_INVITATION_QUERY,
    SET_SEARCH_USER_INVITATION_RESULT, SET_SUCCESS_SENT_INVITATION
} from "./actions";
import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";

export const setSearchQueryUserInvitation = (username) => ({
    type: SET_SEARCH_USER_INVITATION_QUERY,
    payload: {
        username
    }
});

export const searchUserForInvitation = (query, token) => {
    return async dispatch => {
        dispatch(setSearchQueryUserInvitation(query));
        if(query.length > 0)
            return axios.post(`${API_SERVER_URL}/searchUser`, qs.stringify({query}), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                let {status, data} = res.data;
                if(status)
                    dispatch(setResultSearchQuery(data.searchResult)); // settiamo nel redux il risultato

            }).catch((err) => {
                console.log(err);
            });
        }
};

export const setResultSearchQuery = (result) => ({
    type: SET_SEARCH_USER_INVITATION_RESULT,
    payload: {
        result
    }
});

export const addUserToInvitations = (user) => ({
    type: ADD_USER_TO_INVITE_TO_LIST,
    payload: {
        user
    }
});

export const removeUserFromInvitations = (user) => ({
    type: REMOVE_USER_FROM_INVITATIONS_LIST,
    payload: {
        user
    }
});

export const resetDataInvitations = (showSuccessMessage) => ({
    type: RESET_INVITATIONS_DATA,
    payload: {
        showSuccessMessage
    }
});

export const sendInvitations = (users, groupId, token) => {
    return async dispatch => {
        return axios.post(`${API_SERVER_URL}/sendInvitations`, qs.stringify({users, groupId}), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data.status);
            if(res.data.status) {
                dispatch(setSuccessSentInvitation());
                dispatch(resetDataInvitations(true));
            } else {
                dispatch(setErrorSetInvitation(res.data.message));
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const setSuccessSentInvitation = () => ({
    type: SET_SUCCESS_SENT_INVITATION,
});

export const setErrorSetInvitation = (errorMessage) => ({
    type: SET_ERROR_SENT_INVITATION,
    payload: {
        errorMessage
    }
});
