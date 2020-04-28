import {
    ADD_USER_TO_INVITE_TO_LIST,
    SET_SEARCH_USER_INVITATION_QUERY,
    SET_SEARCH_USER_INVITATION_RESULT
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
