import {
    SET_CONFIRM_PASSWORD_SIGNUP,
    SET_EMAIL_SIGNUP,
    SET_PASSWORD_SIGNUP,
    SET_REALNAME_SIGNUP,
    SET_USERNAME_SIGNUP,
    SET_ERROR_SIGNUP,
} from "../../actions/signup/action";
import update from "immutability-helper";

export const signUpReducer = (state = {
    signUpRealname: '',
    signUpUsername: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: ''}, action) => {
        switch(action.type) {
            default:
                return state;

            case SET_REALNAME_SIGNUP:
                return update(state, { signUpRealname: { $set: action.payload.signUpRealname } });

            case SET_USERNAME_SIGNUP:
                return update(state, { signUpUsername: { $set: action.payload.signUpUsername } });

            case SET_EMAIL_SIGNUP:
                return update(state, { signUpEmail: { $set: action.payload.signUpEmail } });

            case SET_PASSWORD_SIGNUP:
                return update(state, { signUpPassword: { $set: action.payload.signUpPassword } });

            case SET_CONFIRM_PASSWORD_SIGNUP:
                return update(state, { signUpConfirmPassword: { $set: action.payload.signUpConfirmPassword } });

            case SET_ERROR_SIGNUP:
                return update(state, {
                    signUpRealnameHasError: { $set: action.payload.signUpRealnameHasError },
                    signUpUsernameHasError: { $set: action.payload.signUpUsernameHasError },
                    signUpEmailHasError: { $set: action.payload.signUpEmailHasError },
                    signUpPasswordHasError: { $set: action.payload.signUpPasswordHasError },
                    signUpConfirmPasswordHasError: { $set: action.payload.signUpConfirmPasswordHasError },
                });
        }
    };