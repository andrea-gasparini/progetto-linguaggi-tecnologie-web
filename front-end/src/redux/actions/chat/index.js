import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";
import {
    ADD_MESSAGE_TO_CHAT,
    ADD_MESSAGES_LOADED,
    RESET_CHAT_DATA,
    SET_REF_CHAT_MESSAGES,
    SET_REQUESTING_CHAT_MESSAGES
} from "./actions";
import socket from "../../../websocket";

export const setRequesting = (value) =>  ({
    type: SET_REQUESTING_CHAT_MESSAGES,
    payload: {
        value
    }
});

export const getChatMessages = (token, groupId, offset) => {
    return async dispatch => {
        dispatch(setRequesting(true));
        return await axios.post(`${API_SERVER_URL}/getChatMessages`, qs.stringify({groupId, offset}), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status) {
                dispatch(addMessagesLoaded(res.data.data.messages.reverse(), res.data.data.canLoadOtherMessagesChat, res.data.data.newOffset));
                setTimeout(() => {
                    dispatch(setRequesting(false));
                }, 800); // .8 secondi di cooldown a richiesta.
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const addMessagesLoaded = (messages, canLoadOtherMessagesChat, newOffset) => ({
    type: ADD_MESSAGES_LOADED,
    payload: {
        messages,
        canLoadOtherMessagesChat,
        newOffset
    }
});

export const tryAddMessage = (token, message, groupId) => {
    return async dispatch => {
        return await axios.post(`${API_SERVER_URL}/sendMessage`, qs.stringify({message, groupId}), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status) {
                dispatch(addMessageToChat(res.data.data));
                socket.emit('newChatMessage', {token: res.data.data.chatToken});
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


export const resetChatData = () => ({
    type: RESET_CHAT_DATA
});

export const setRef = (refChatMessages) => ({
    type: SET_REF_CHAT_MESSAGES,
    payload: {
        refChatMessages
    }
})
