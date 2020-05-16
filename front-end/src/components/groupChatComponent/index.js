import React, {Component, Fragment} from "react";
import './style.css';
import {ChevronLeft, ChevronRight, Send} from "react-feather";

class GroupChatComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <Fragment>
                <div className={"d-flex flex-row"} style={{width: "100%", position: "relative"}}>
                    <div className={"d-flex chatBox flex-column justify-content-between"}>
                        <div className={"d-flex chatMessages flex-column"}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value, index) => (
                                <div key={index} className={"d-flex message"}>
                                    <div className={"userIconMessage"}/>
                                    <div className={"messageText p-2"}>
                                        <div className={"username"}>Username</div>
                                        <div>Ciao io sono edoaardo e questo è un messaggio moltoo lungo {index}</div>
                                        <div className={"hourSentMessage"}>18:10</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"d-flex sendMessageInput align-items-center justify-content-between"}>
                            <input type={"text"} className={"form-control messageInputArea"} placeholder={"Inserisci un messaggio..."} />
                            <Send className={"sendMessageIcon"} />
                        </div>
                    </div>
                    {/*<div className={"d-flex flex-column onlineUsers  p-1"}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((user, index) => (
                        <div title={`${user} è online ora!` } key={index} className={"d-flex userBoxOnline align-items-center"}>
                            <div className={"userOnline"} />
                            <div className={"text-muted"} style={{marginLeft: 10}}>
                                {user}
                            </div>
                        </div>
                    ))}
                    </div>*/}
                </div>
            </Fragment>
        )
    }
}

export default GroupChatComponent;
