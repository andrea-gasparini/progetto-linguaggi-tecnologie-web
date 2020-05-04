import {
    SET_CONFIRM_PASSWORD_SIGNUP,
    SET_EMAIL_SIGNUP,
    SET_PASSWORD_SIGNUP,
    SET_REALNAME_SIGNUP,
    SET_USERNAME_SIGNUP,
    SET_ERROR_SIGNUP, RESET_DATA_SIGNUP
} from "./action";
import axios from "axios";
import qs from 'querystring';
import {API_SERVER_URL} from "../../../globalConstants";

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

export const setErrorSignUp = (data) => ({ // { signUpRealnameHasError: true/false, ... }
    type: SET_ERROR_SIGNUP,
    payload: {
        ...data
    }
});

export const tryAuthSignUp = (credentials, cookies, history) => {
    return async dispatch => {
        return axios.post(`${API_SERVER_URL}/signup`, qs.stringify(credentials)).then((res) => {
            let {data, message} = res.data;
            if(!res.data.status)
                dispatch(setErrorSignUp({ ...data, message: message}));
            else {
                dispatch(resetDataSignup());
                cookies.set('token', data.token); // mettiamo nei cookie il nuovo token
                history.push('/home'); // redirect alla home.
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};

export const resetDataSignup = () => ({
    type: RESET_DATA_SIGNUP
});
