import {combineReducers} from "redux";
import {loginReducer} from "./login/loginReducer";
import {signUpReducer} from "./signup/signUpReducer";

export default combineReducers({
    loginReducer,
    signUpReducer,
});
