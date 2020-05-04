import {ADD_NEW_GROUP, REMOVE_GROUP, SET_USER_DATA, SET_USER_INVITATIONS_DATA} from "../../actions/user/actions";
import update from "immutability-helper";
import {RESET_INVITATIONS_COUNT_NOTIFICATION, REPLY_TO_INVITATION} from "../../actions/user/actions";

export const userReducer = (state = {}, action) => {
    switch(action.type) {
        default:
            return state;

        case SET_USER_DATA:
            return update(state, {
                userData: {$set: action.payload.userData}
            });

        case SET_USER_INVITATIONS_DATA: {
            return update(state, {
                userData: {
                    invitationsList: {$set: action.payload.invitations}
                }
            })
        }

        case RESET_INVITATIONS_COUNT_NOTIFICATION:
            return update(state, {
                userData: {
                    userNotifications: {$set: 0}
                }
            });

        case REPLY_TO_INVITATION:
            return update(state, {
                userData: {
                    invitationsList: arr => arr.filter(invitation => invitation.id != action.payload.groupId),
                }
            });

        case ADD_NEW_GROUP:
            return update(state, {
               userData: {
                   userGroups: {$unshift: [action.payload.group]}
               }
            });

        case REMOVE_GROUP:
            return update(state, {
                userData: {
                    userGroups: arr => arr.filter(group => group.id != action.payload.groupId)
                }
            })
    }
};

export default userReducer;
