import {combineReducers} from "redux";
import {loginReducer} from "./login/loginReducer";
import {invitationsReducer} from "./invitations/invitationsReducer";
import {userReducer} from "./user/userReducer";

export default combineReducers({
    loginReducer,
    invitationsReducer,
    userReducer
});
