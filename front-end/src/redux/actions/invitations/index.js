import {SET_SEARCH_USER_INVITATION_QUERY} from "./actions";

export const setSearchQueryUserInvitation = (username) => ({
    type: SET_SEARCH_USER_INVITATION_QUERY,
    payload: {
        username
    }
});
