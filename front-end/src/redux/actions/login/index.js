import {SET_ERROR_LOGIN, SET_PASSWORD_LOGIN, SET_USERNAME_LOGIN} from "./actions";

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

export const setErrorLogin = (data) => ({ // data sarà della forma tipo {usernameHasError: true, passwordHasError: true, messageErrorLogin: 'blablabla'}
    // facendo ...data automaticamente spacchetta l'oggetto nel payload in maniera da accedere a passwordHasError in questa maniera:
    // payload.passwordHasError
    type: SET_ERROR_LOGIN,
    payload: {
        ...data
    }
});
