import {SET_USER_DATA} from "../../actions/user/actions";
import update from "immutability-helper";

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
    }
};

export default userReducer;
