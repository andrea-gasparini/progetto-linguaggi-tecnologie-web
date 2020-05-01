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
    }
};

export default userReducer;
