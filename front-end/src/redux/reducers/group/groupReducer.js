import {ADD_GROUP_POSTS, ADD_NEW_POST, CHANGE_COMMENT_VALUE} from "../../actions/group/actions";
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
            return update(state, {
                groupPosts: {$unshift: [action.payload.post]}
            });

        case CHANGE_COMMENT_VALUE:
            return update(state, {
                groupPosts: { // groupPosts[postIndex]
                    [action.payload.postIndex]: {
                        newCommentValue: {$set: action.payload.commentValue}
                    }
                }
            });
    }
};

export default groupReducer;
