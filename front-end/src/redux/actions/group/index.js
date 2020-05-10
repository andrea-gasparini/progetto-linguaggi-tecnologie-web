import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";

export const loadPosts = (token, offset, groupId) => {
    return async dispatch => {
        return await axios.post(`${API_SERVER_URL}/getGroupPosts`, qs.stringify({}))
    }
}
