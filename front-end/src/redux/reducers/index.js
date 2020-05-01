import {combineReducers} from "redux";
import {loginReducer} from "./login/loginReducer";
import {signUpReducer} from "./signup/signUpReducer";
import {invitationsReducer} from "./invitations/invitationsReducer";

export default combineReducers({
    loginReducer,
    signUpReducer,
    invitationsReducer
});
