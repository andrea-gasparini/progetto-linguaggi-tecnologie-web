import {combineReducers} from "redux";
import {loginReducer} from "./login/loginReducer";
import {invitationsReducer} from "./invitations/invitationsReducer";

export default combineReducers({
    loginReducer,
    invitationsReducer
});
