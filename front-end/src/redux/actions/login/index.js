import {RESET_DATA_LOGIN, SET_ERROR_LOGIN, SET_PASSWORD_LOGIN, SET_USERNAME_LOGIN} from "./actions";
import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "qs";
import {setUserData} from "../user";
import {RESET_DATA_SIGNUP} from "../signup/action";

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

export const tryAuthLogin = (username, password, cookies, history) => {
    return async dispatch => {
        return axios.post(`${API_SERVER_URL}/login`, qs.stringify({username, password})).then((res) => {
            let {data, message} = res.data;
            if(!res.data.status)
                dispatch(setErrorLogin({usernameHasError: data.usernameHasError, passwordHasError: data.passwordHasError, message: message}));
            else {
                dispatch(resetDataLogin());
                dispatch(setUserData(data.userData));
                cookies.set('token', data.token); // mettiamo nei cookie il nuovo token
                history.push('/home', {fromLogin: true}); // redirect alla home.
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};

export const validateToken = (cookies, history, fromLogin=false) => {
    return async dispatch => {
        return axios.post(`${API_SERVER_URL}/validate`, null, {
           headers: {
               "Authorization": `Bearer ${cookies.cookies.token}`
           }
        }).then((res) => {
            let {status, data} = res.data;
            if(status) {
                dispatch(setUserData(data.userData));
                cookies.set('token', data.token);
                history.push({pathname: '/home', search: '', state: {fromLogin}});
            } else {
                cookies.remove('token');
                if(history.location !== '/')
                    history.push('/');
            }

        }).catch((err) => {
            console.log(err);
        });
    }
};

export const resetDataLogin = () => ({
    type: RESET_DATA_LOGIN
});
