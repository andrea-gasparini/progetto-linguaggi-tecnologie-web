import {ADD_GROUP_POSTS} from "../../actions/group/actions";
import update from "immutability-helper";

const groupReducer = (state = {groupPosts: [], hasOtherPostsToLoad: true}, action) => {
    switch(action.type) {
        default:
            return state;

        case ADD_GROUP_POSTS:
            return update(state, {
                groupPosts: {$push: action.payload.posts},
                hasOtherPostsToLoad: {$set: action.payload.hasOtherPostsToLoad}
            });
    }
};

export default groupReducer;
