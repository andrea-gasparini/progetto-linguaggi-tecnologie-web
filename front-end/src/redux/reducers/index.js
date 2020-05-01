import {combineReducers} from "redux";
import {loginReducer} from "./login/loginReducer";
import {signUpReducer} from "./signup/signUpReducer";
import {invitationsReducer} from "./invitations/invitationsReducer";
import {userReducer} from "./user/userReducer";

export default combineReducers({
    loginReducer,
    signUpReducer,
    invitationsReducer,
    userReducer
});
