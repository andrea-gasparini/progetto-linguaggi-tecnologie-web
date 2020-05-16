import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";
import {ADD_MESSAGE_TO_CHAT} from "./actions";


export const tryAddMessage = (token, message, groupId) => {
    return async dispatch => {
        return await axios.post(`${API_SERVER_URL}/sendMessage`, qs.stringify({message, groupId}), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status) {
                dispatch(addMessageToChat(res.data.data));
                //console.log("HAHHA");
            }

        }).catch((err) => {
            console.log(err);
        });
    }
};


export const addMessageToChat = (message) => ({
    type: ADD_MESSAGE_TO_CHAT,
    payload: {
        message
    }
});
