import React, {Component, Fragment} from "react";
import {PlusCircle} from "react-feather";
import './style.css';
import {API_SERVER_URL} from "../../globalConstants";
import {withCookies} from "react-cookie";
import CommentComponent from "../groupPostCommentComponent";
import FilePreviewComponent from "../filePreviewComponent";
import axios from 'axios';
import qs from 'querystring';
import {connect} from "react-redux";
import {addNewComment} from "../../redux/actions/group";

class GroupPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textareaMinHeight: undefined,
            newCommentValue: "",
            newCommentIsActive: false
        }
    }

    addNewCommentRequest() {
        let {dispatch, cookies, groupId, postId, postIndex} = this.props;
        let { newCommentValue } = this.state;

        if (newCommentValue.trim() !== '') {
            axios.post(
                `${API_SERVER_URL}/addComment`,
                qs.stringify({groupId, postId, newCommentValue}),
                {headers: {'Authorization': `Bearer ${cookies.cookies.token}`}}
            ).then(res => {
                if (res.status) {
                    dispatch(addNewComment(postIndex, res.data.data.comment));
                    this.setState({newCommentValue: ''});
                }
            });
        }
    }

    handleEnterShiftKeyPress(e) {
        if (e.keyCode == 13 && ! e.shiftKey) {
            e.preventDefault();
            this.addNewCommentRequest();
            e.target.style.height = this.state.textareaMinHeight + "px";
        }
    }

    handleNewCommentTextValue(e) {
        // setto sempre ad una riga l'altezza della textarea
        if (! this.state.textareaMinHeight)
            this.state.textareaMinHeight = Math.min(e.target.scrollHeight, 25);
        else
            e.target.style.height = this.state.textareaMinHeight + "px";

        // in base a quanto scroll ci sarebbe con una sola riga, reimposto l'altezza
        e.target.style.height = e.target.scrollHeight + "px";

        this.setState({newCommentValue: e.target.value});
    };

    toggleNewCommentActiveState() { this.setState({newCommentIsActive: ! this.state.newCommentIsActive}) }

    formatDate(postgreDate) {
        let parsedDate = new Date(postgreDate);
        return parsedDate.toLocaleDateString() + ' ' + parsedDate.toLocaleTimeString();
    }

    render() {
        let {username, realname, publishDate, text, picture, comments, filesList} = this.props;
        let {newCommentValue} = this.state;
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
                                    {this.formatDate(publishDate)}
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
                        <FilePreviewComponent key={index} toUploadState={false} file={{name: filesList[file].originalName, fileUrl: `${API_SERVER_URL}/uploads/groupsFiles/11/${filesList[file].serverName}`, type: filesList[file].type}} />
                    ))}

                    <div className={"post-comments"}>
                    {typeof comments !== "undefined" && comments.length > 0 &&  comments.map((comment, index) => (
                        <CommentComponent key={comment.commentId} realname={comment.realname} username={comment.username} createdAt={comment.createdAt} text={comment.commentText} picture={comment.picture} />
                    ))}
                    </div>

                    <div className={["post-new-comment", this.state.newCommentIsActive ? "active" : ""].join(" ")}>
                        <textarea
                            rows={1}
                            value={newCommentValue}
                            placeholder={"Aggiungi un commento al post.."}
                            onKeyDown={(e) => this.handleEnterShiftKeyPress(e)}
                            onChange={e => this.handleNewCommentTextValue(e)}
                            onFocus={() => this.toggleNewCommentActiveState()}
                            onBlur={() => this.toggleNewCommentActiveState()} />
                        <PlusCircle className={"new-comment-icon"} onClick={() => this.addNewCommentRequest()} />
                    </div>

                </div>
            </Fragment>
        );
    }

}

export default withCookies(connect()(GroupPostComponent));
