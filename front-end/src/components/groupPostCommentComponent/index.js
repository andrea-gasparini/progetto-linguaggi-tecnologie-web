import React, {Component, Fragment} from "react";
import './style.css';

class CommentComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {realname, username, text} = this.props;

        return (
            <Fragment>
                <div className={"post-comment"}>
                    <div className={"d-flex align-items-center"}>
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