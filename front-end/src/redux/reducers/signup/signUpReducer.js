import update from "immutability-helper";
import {
    SET_CONFIRM_PASSWORD_SIGNUP,
    SET_EMAIL_SIGNUP,
    SET_PASSWORD_SIGNUP,
    SET_REALNAME_SIGNUP,
    SET_USERNAME_SIGNUP
} from "../../actions/signup/action";

export const signUpReducer =
    (state = { signUpRealname: '', signUpUsername: '', signUpEmail: '', signUpPassword: '', signUpConfirmPassword: ''}, action) => {
        switch(action.type) {
            default:
                return state;

            case SET_REALNAME_SIGNUP:
                return;

            case SET_USERNAME_SIGNUP:
                return;

            case SET_EMAIL_SIGNUP:
                return;

            case SET_PASSWORD_SIGNUP:
                return;

            case SET_CONFIRM_PASSWORD_SIGNUP:
                return;
        }
    };