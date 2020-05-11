import {ADD_GROUP_POSTS, ADD_NEW_POST} from "../../actions/group/actions";
import update from "immutability-helper";

const groupReducer = (state = {groupPosts: [], hasOtherPostsToLoad: true, currentOffset: 0}, action) => {
    switch(action.type) {
        default:
            return state;

        case ADD_GROUP_POSTS:
            return update(state, {
                groupPosts: {$push: action.payload.posts},
                hasOtherPostsToLoad: {$set: action.payload.hasOtherPostsToLoad},
                currentOffset: {$set: state.currentOffset + 15}
            });

        case ADD_NEW_POST:
            console.log(action);
            return update(state, {
                groupPosts: {$unshift: [action.payload.post]}
            });
    }
};

export default groupReducer;
