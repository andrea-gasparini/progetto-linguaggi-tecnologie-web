import React, {Component, Fragment} from "react";
import GroupPostComponent from "../groupPostComponent";
import {connect} from "react-redux";
import {changeCommentValue} from "../../redux/actions/group";

const mapStateToProps = (state) => ({...state.groupReducer});

class WallPostsGroupComponent extends Component {

    changeCommentValue = (postIndex, commentValue) => {
        let {dispatch} = this.props;
        dispatch(changeCommentValue(postIndex, commentValue));
    };

    render() {
        let {groupPosts, groupId} = this.props;
        return(
            <Fragment>
                {typeof groupPosts !== "undefined" && groupPosts.map((post, index) => (
                    <GroupPostComponent changeCommentValue={this.changeCommentValue} newCommentValue={groupPosts[index].newCommentValue} indexPost={index} groupId={groupId} key={index} filesList={JSON.parse(post.file_uploaded)} comments={post.comments} realname={post.realname} username={post.username} publishDate={post.created_at} picture={post.profile_picture} text={post.post_text} />
                ))}
            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(WallPostsGroupComponent);
