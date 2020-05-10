import React, {Component, Fragment} from "react";
import {PlusCircle} from "react-feather";
import './style.css';

class GroupPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textareaMinHeight: undefined,
            newCommentValue: "",
            isActive: false
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

        this.setState({newCommentValue: e.target.value});
    };

    toggleActiveState() { this.setState({isActive: ! this.state.isActive}) }

    render() {

        let {username, realname, publishDate, text} = this.props;

        return (
            <Fragment>
                <div className={"post"}>
                    <div className={"post-header"}>
                        <img className={"profile-pic noselectText"} src={"https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"}/>
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
                    <div className={["post-new-comment", this.state.isActive ? "active" : ""].join(" ")}>
                        <textarea
                            rows={1}
                            placeholder={"Aggiungi un commento al post.."}
                            onChange={e => this.handleTextAreaValue(e)}
                            onFocus={() => this.toggleActiveState()}
                            onBlur={() => this.toggleActiveState()} />
                        <PlusCircle className={"new-comment-icon"} />
                    </div>
                </div>
            </Fragment>
        );
    }

}

export default GroupPostComponent;