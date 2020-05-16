import React, {Component, Fragment} from "react";
import {PlusCircle} from "react-feather";
import './style.css';
import {API_SERVER_URL} from "../../globalConstants";
import CommentComponent from "../groupPostCommentComponent";
import FilePreviewComponent from "../filePreviewComponent";
import {connect} from "react-redux";


class GroupPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textareaMinHeight: undefined,
            newCommentValue: "",
            newCommentIsActive: false
        }
    }

    handleTextAreaValue(e) {
        // setto sempre ad una riga l'altezza della textarea
        if (! this.state.textareaMinHeight)
            this.state.textareaMinHeight = e.target.scrollHeight;
        else
            e.target.style.height = this.state.textareaMinHeight + "px";

        // in base a quanto scroll ci sarebbe con una sola riga, reimposto l'altezza
        e.target.style.height = e.target.scrollHeight + "px";

        let {indexPost} = this.props;
        this.props.changeCommentValue(indexPost, e.target.value);
        //this.setState({newCommentValue: e.target.value});
    };

    toggleActiveState() { this.setState({newCommentIsActive: ! this.state.newCommentIsActive}) }

    render() {
        let {username, realname, publishDate, text, picture, comments, filesList, groupId, indexPost, newCommentValue} = this.props;
        return (
            <Fragment>
                <div className={"post"}>
                    <div>
                        <div className={"post-header"}>
                            <div className={"profile-pic noselectText"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${picture}")`, backgroundSize: "cover", borderRadius: "50%"}}/>
                            <div className={"d-flex flex-column"}>
                                <div className={"d-flex align-items-center"}>
                                    <span className={"realname"}>
                                        {realname}
                                    </span>
                                    <span className={"text-muted"}>
                                        {"(@" + username + ")"}
                                    </span>
                                </div>
                                <span className={"publish-date"}>
                                    {publishDate}
                                </span>
                            </div>
                        </div>

                        <div className={"post-body"}>
                            <p>{text}</p>
                            <div className={"attachments"}>
                                {/* */}
                            </div>
                        </div>

                    </div>

                    {typeof filesList !== "undefined" && Object.keys(filesList).length > 0 && Object.keys(filesList).map((file, index) => (
                        <FilePreviewComponent key={index} toUploadState={false} file={{name: filesList[file].originalName, fileUrl: `${API_SERVER_URL}/uploads/groupsFiles/${groupId}/${filesList[file].serverName}`, type: filesList[file].type}} />
                    ))}

                    <div className={"post-comments"}>
                    {typeof comments !== "undefined" && comments.length > 0 &&  comments.map((comment, index) => (
                            <CommentComponent realname={comment.realname} username={comment.username} createdAt={comment.createdAt} text={comment.commentText} picture={comment.picture} />
                    ))}
                    </div>


                    <div className={["post-new-comment", this.state.newCommentIsActive ? "active" : ""].join(" ")}>
                        <textarea
                            id={"post_comment_" + indexPost}
                            rows={1}
                            placeholder={"Aggiungi un commento al post.."}
                            onChange={e => this.handleTextAreaValue(e)}
                            onFocus={() => this.toggleActiveState()}
                            onBlur={() => this.toggleActiveState()}>{newCommentValue}</textarea>
                        <PlusCircle className={"new-comment-icon"} />
                    </div>

                </div>
            </Fragment>
        );
    }

}

export default connect()(GroupPostComponent);
