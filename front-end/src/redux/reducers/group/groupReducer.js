import {
    ADD_GROUP_POSTS,
    ADD_NEW_COMMENT,
    ADD_NEW_POST,
    LOAD_MORE_COMMENTS,
    RESET_GROUP_DATA
} from "../../actions/group/actions";
import update from "immutability-helper";

const groupReducer = (state = {groupPosts: [], hasOtherPostsToLoad: true, currentOffset: 0}, action) => {
    switch(action.type) {
        default:
            return state;

        case RESET_GROUP_DATA: {
            return update(state, {
                groupPosts: {$set: []},
                hasOtherPPostsToLoad: {$set: true},
                currentOffset: {$set: 0}
            });
        }

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

        case ADD_NEW_COMMENT:
            return update(state, {
                groupPosts: { [action.payload.postIndex]: {
                        comments: { $push: [action.payload.comment] }
                }}
            });

        case LOAD_MORE_COMMENTS:
            return update(state, {
                groupPosts: { [action.payload.postIndex]: {
                        comments: { $unshift: action.payload.comments },
                        commentsCount: { $set: state.groupPosts[action.payload.postIndex].commentsCount - 3 }
                }}
            });
    }
};

export default groupReducer;
