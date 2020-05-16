import {ADD_MESSAGE_TO_CHAT} from "../../actions/chat/actions";
import update from "immutability-helper";

const chatReducer = (state = {messages: []}, action) => {
    switch(action.type) {
        default:
            return state;

        case ADD_MESSAGE_TO_CHAT:
            return update(state, {
                messages: {$push: [action.payload.message]}
            })
    }
};

export default chatReducer;
