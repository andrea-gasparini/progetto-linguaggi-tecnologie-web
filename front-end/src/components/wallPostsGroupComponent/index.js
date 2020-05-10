import React, {Component, Fragment} from "react";
import GroupPostComponent from "../groupPostComponent";

class WallPostsGroupComponent extends Component {

    render() {
        let {posts} = this.props;
        return(
            <Fragment>
                {typeof posts !== "undefined" && posts.map((post, index) => (
                    <GroupPostComponent realname={post.realname} username={post.username} publishDate={post.created_at} picture={post.profile_picture} text={post.post_text} />
                ))}
            </Fragment>
        )
    }
}

export default WallPostsGroupComponent;
