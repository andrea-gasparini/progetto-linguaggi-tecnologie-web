import {
    ADD_MESSAGE_TO_CHAT,
    ADD_MESSAGES_LOADED,
    RESET_CHAT_DATA, SET_REF_CHAT_MESSAGES,
    SET_REQUESTING_CHAT_MESSAGES
} from "../../actions/chat/actions";
import update from "immutability-helper";

const chatReducer = (state = {messages: [], offsetChatMessages: 0, canLoadOtherMessagesChat: true, isRequestingChatMessages: false}, action) => {
    switch(action.type) {
        default:
            return state;

        case ADD_MESSAGE_TO_CHAT:
            return update(state, {
                messages: {$push: [action.payload.message]}
            });

        case SET_REQUESTING_CHAT_MESSAGES:
            return update(state, {
                isRequestingChatMessages: {$set: action.payload.value}
            });

        case RESET_CHAT_DATA:
            return update(state, {
                messages: {$set: []},
                offsetChatMessages: {$set: 0},
                canLoadOtherMessagesChat: {$set: true},
                isRequestingChatMessages: {$set: false}
            });

        case ADD_MESSAGES_LOADED: {
            return update(state, {
                messages: {$unshift: action.payload.messages},
                offsetChatMessages: {$set: action.payload.newOffset},
                canLoadOtherMessagesChat: {$set: action.payload.canLoadOtherMessagesChat},
            });
        }

        case SET_REF_CHAT_MESSAGES: {
            return update(state, {
                refChatMessages: {$set: action.payload.refChatMessages}
            });
        }
    }
};

export default chatReducer;
