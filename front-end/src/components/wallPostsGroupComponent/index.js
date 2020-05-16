import React, {Component, Fragment} from "react";
import GroupPostComponent from "../groupPostComponent";
import {resetDataGroup} from "../../redux/actions/group";

class WallPostsGroupComponent extends Component {

    componentWillUnmount() {
        let {dispatch} = this.props;
        dispatch(resetDataGroup());
    }

    render() {
        let {groupId, posts} = this.props;
        return(
            <Fragment>
                {typeof posts !== "undefined" && posts.map((post, index) => (
                    <GroupPostComponent
                        key={post.id}
                        filesList={JSON.parse(post.file_uploaded)}
                        comments={post.comments}
                        realname={post.realname}
                        username={post.username}
                        publishDate={post.created_at}
                        picture={post.profile_picture}
                        text={post.post_text}
                        groupId={groupId}
                        postId={post.id}
                        postIndex={index} />
                ))}
            </Fragment>
        )
    }
}

export default WallPostsGroupComponent;
