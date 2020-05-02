import {SET_USER_DATA, SET_USER_INVITATIONS_DATA} from "../../actions/user/actions";
import update from "immutability-helper";
import {RESET_INVITATIONS_COUNT_NOTIFICATION} from "../../actions/user/actions";

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
    }
};

export default userReducer;
