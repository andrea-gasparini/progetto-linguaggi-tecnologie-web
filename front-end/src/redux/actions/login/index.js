import {SET_ERROR_LOGIN, SET_PASSWORD_LOGIN, SET_USERNAME_LOGIN} from "./actions";
import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "qs";

export const setUsername = (username) => ({
    type: SET_USERNAME_LOGIN,
    payload: {
        username
    }
});

export const setPassword = (password) => ({
    type: SET_PASSWORD_LOGIN,
    payload: {
        password
    }
});

export const setErrorLogin = (data) => ({ // data sarà della forma tipo {usernameHasError: true, passwordHasError: true, message: 'blablabla'}
    // facendo ...data automaticamente spacchetta l'oggetto nel payload in maniera da accedere a passwordHasError in questa maniera:
    // payload.passwordHasError
    type: SET_ERROR_LOGIN,
    payload: {
        ...data
    }
});

export const tryAuthLogin = (username, password) => {
    return async dispatch => {
        return axios.post(`${API_SERVER_URL}/login`, qs.stringify({username, password})).then((res) => {
            let {data, message} = res.data;
            if(!res.data.status)
                dispatch(setErrorLogin({usernameHasError: data.usernameHasError, passwordHasError: data.passwordHasError, message: message}));
            else {

            }
        }).catch((err) => {
            console.log(err);
        })
    }
}
