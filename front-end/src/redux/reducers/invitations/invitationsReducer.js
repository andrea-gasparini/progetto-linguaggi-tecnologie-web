import {
    ADD_USER_TO_INVITE_TO_LIST,
    SET_SEARCH_USER_INVITATION_QUERY,
    SET_SEARCH_USER_INVITATION_RESULT
} from "../../actions/invitations/actions";
import update from "immutability-helper";

export const invitationsReducer = (state = {searchQuery: '', searchQueryResult: [], readyToSendInvite: []}, action) => {
    switch(action.type) {
        default:
            return state;

        case SET_SEARCH_USER_INVITATION_QUERY:
            return update(state, {
                searchQuery: {$set: action.payload.username}
            });

        case SET_SEARCH_USER_INVITATION_RESULT:
            return update(state, {
                searchQueryResult: {$set: action.payload.result}
            });

        case ADD_USER_TO_INVITE_TO_LIST:
            return update(state, {
                readyToSendInvite: {$push: action.payload.user}
            })
    }
};
