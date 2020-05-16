import {ADD_MESSAGE_TO_CHAT, ADD_MESSAGES_LOADED, RESET_CHAT_DATA} from "../../actions/chat/actions";
import update from "immutability-helper";

const chatReducer = (state = {messages: [], offsetChatMessages: 0}, action) => {
    switch(action.type) {
        default:
            return state;

        case ADD_MESSAGE_TO_CHAT:
            return update(state, {
                messages: {$push: [action.payload.message]}
            });

        case RESET_CHAT_DATA:
            return update(state, {
                messages: {$set: []},
                offsetChatMessages: {$set: 0}
            });

        case ADD_MESSAGES_LOADED: {
            return update(state, {
                messages: {$unshift: action.payload.messages}
            })
        }
    }
};

export default chatReducer;
