import React, {Component, Fragment} from "react";
import './style.css';
import {API_SERVER_URL} from "../../globalConstants";

class CommentComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {realname, username, text, picture, createdAt} = this.props;

        return (
            <Fragment>
                <div className={"post-comment"}>
                    <div className={"d-flex align-items-center"}>
                        <div className={"commentUserPicture"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${picture}")`}}/>
                        <span className={"realname"}>
                            {realname}
                        </span>
                        <span className={"username text-muted"}>
                            {"(@" + username + ")"}
                        </span>
                    </div>
                    <p>
                        {text}
                    </p>
                </div>
            </Fragment>
        );
    }

}

export default CommentComponent;
