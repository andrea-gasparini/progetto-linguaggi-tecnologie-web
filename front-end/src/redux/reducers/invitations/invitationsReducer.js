import {SET_SEARCH_USER_INVITATION_QUERY} from "../../actions/invitations/actions";
import update from "immutability-helper";

export const invitationsReducer = (state = {searchQuery: ''}, action) => {
    switch(action.type) {
        default:
            return state;

        case SET_SEARCH_USER_INVITATION_QUERY:
            return update(state, {
                searchQuery: {$set: action.payload.username}
            })
    }
};
