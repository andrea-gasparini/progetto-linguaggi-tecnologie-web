import {SET_ERROR_LOGIN, SET_PASSWORD_LOGIN, SET_USERNAME_LOGIN} from "../../actions/login/actions";
import update from "immutability-helper";

export const loginReducer = (state = {username: '', password: ''}, action) => {
    switch(action.type) {
        default:
            return state;

        case SET_USERNAME_LOGIN:
            return update(state, {
                username: {$set: action.payload.username}
            });

        case SET_PASSWORD_LOGIN:
            return update(state, {
                password: {$set: action.payload.password}
            });

        case SET_ERROR_LOGIN:
            return update(state, {
                usernameHasError: {$set: action.payload.usernameHasError},
                passwordHasError: {$set: action.payload.passwordHasError},
                messageLoginError: {$set: action.payload.message}
            });


    }
};
