import {combineReducers} from "redux";
import {loginReducer} from "./login/loginReducer";
import {signUpReducer} from "./signup/signUpReducer";
import {invitationsReducer} from "./invitations/invitationsReducer";
import {userReducer} from "./user/userReducer";
import groupReducer from "./group/groupReducer";
import chatReducer from "./chat/chatReducer";

export default combineReducers({
    loginReducer,
    signUpReducer,
    invitationsReducer,
    userReducer,
    groupReducer,
    chatReducer
});
