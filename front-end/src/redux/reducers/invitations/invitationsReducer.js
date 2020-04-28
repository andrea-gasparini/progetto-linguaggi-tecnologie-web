import {
    ADD_USER_TO_INVITE_TO_LIST,
    REMOVE_USER_FROM_INVITATIONS_LIST,
    REMOVE_USER_FROM_INVITATIONS_LIT,
    RESET_INVITATIONS_DATA,
    SET_SEARCH_USER_INVITATION_QUERY,
    SET_SEARCH_USER_INVITATION_RESULT
} from "../../actions/invitations/actions";
import update from "immutability-helper";

export const invitationsReducer = (state = {searchQuery: '', searchQueryResult: [], readyToSendInvite: [], usernameListInvitations: []}, action) => {
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
                readyToSendInvite: {$push: action.payload.user},
                usernameListInvitations: {$push: [action.payload.user[0].username]}
            });

        case REMOVE_USER_FROM_INVITATIONS_LIST:
            return update(state, {
                readyToSendInvite: arr => arr.filter(user => user.username != action.payload.user),
                usernameListInvitations: arr => arr.filter(user => user != action.payload.user),
            });

        case RESET_INVITATIONS_DATA:
            return update(state, {
                searchQueryResult: {$set: []},
                searchQuery: {$set: ''},
                readyToSendInvite: {$set: []},
                usernameListInvitations: {$set: []}
            })
    }
};
