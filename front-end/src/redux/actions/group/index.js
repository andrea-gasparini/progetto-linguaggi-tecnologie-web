import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";
import {ADD_GROUP_POSTS, ADD_NEW_POST, ADD_NEW_COMMENT, RESET_GROUP_DATA} from "./actions";

export const loadPosts = (token, offset, groupId) => {
    return async dispatch => {
        return await axios.post(`${API_SERVER_URL}/getGroupPosts`, qs.stringify({offset, groupId}), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            let {status, data} = res.data;
            if(status) {
                dispatch(addPostsToGroup(data.posts, data.hasOtherPostsToLoad))
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const addPostsToGroup = (posts, hasOtherPostsToLoad) => ({
    type: ADD_GROUP_POSTS,
    payload: {
        posts,
        hasOtherPostsToLoad
    }
});

export const addNewPost = (post) => ({
    type: ADD_NEW_POST,
    payload: {
        post
    }
});

export const addNewComment = (postIndex, newCommentValue) => ({
   type: ADD_NEW_COMMENT,
   payload: {
       postIndex,
       newCommentValue
   }
});

export const resetDataGroup = () => ({
    type: RESET_GROUP_DATA,
});
