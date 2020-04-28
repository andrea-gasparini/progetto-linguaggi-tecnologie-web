import {SET_SEARCH_USER_INVITATION_QUERY} from "./actions";
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
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
};
