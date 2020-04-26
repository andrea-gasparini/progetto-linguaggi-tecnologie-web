import {
    SET_CONFIRM_PASSWORD_SIGNUP,
    SET_EMAIL_SIGNUP,
    SET_PASSWORD_SIGNUP,
    SET_REALNAME_SIGNUP,
    SET_USERNAME_SIGNUP
} from "./action";

export const setSignUpRealname = (signUpRealname) => ({
    type: SET_REALNAME_SIGNUP,
    payload: {
        signUpRealname
    }
});

export const setSignUpUsername = (signUpUsername) => ({
   type: SET_USERNAME_SIGNUP,
   payload: {
       signUpUsername
   }
});

export const setSignUpEmail = (signUpEmail) => ({
    type: SET_EMAIL_SIGNUP,
    payload: {
        signUpEmail
    }
});

export const setSignUpPassword = (signUpPassword) => ({
    type: SET_PASSWORD_SIGNUP,
    payload: {
        signUpPassword
    }
});

export const setSignUpConfirmPassword = (signUpConfirmPassword) => ({
    type: SET_CONFIRM_PASSWORD_SIGNUP,
    payload: {
        signUpConfirmPassword
    }
});