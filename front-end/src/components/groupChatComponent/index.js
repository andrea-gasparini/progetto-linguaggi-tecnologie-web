import React, {Component, Fragment} from "react";
import './style.css';
import {ChevronLeft, ChevronRight, Send} from "react-feather";

class GroupChatComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showScrollLeftUserOnline: false,
            showScrollRightUserOnline: true
        }
    }

    scrollUsersOnline = (direction, step, distance) => {
        let scrollAmount = 0;
        let slideTimer = setInterval(() => {
            if(direction === 'left')
                this.scrollElement.scrollLeft -= step;
            else
                this.scrollElement.scrollLeft += step;

            scrollAmount += step;
            if(scrollAmount >= distance) {
                window.clearInterval(slideTimer);
                if(this.scrollElement.scrollLeft > 0)
                    this.setState({showScrollLeftUserOnline: true});
                else
                    this.setState({showScrollLeftUserOnline: false});

                if(this.scrollElement.scrollWidth - this.scrollElement.clientWidth <= this.scrollElement.scrollLeft) // massimo scroll orizzontale
                    this.setState({showScrollRightUserOnline: false});
                else
                    this.setState({showScrollRightUserOnline: true});
            }
        }, 15);
    };

    render() {
        let {showScrollLeftUserOnline, showScrollRightUserOnline} = this.state;
        return(
            <Fragment>
                <div className={"d-flex flex-column"} style={{width: "100%", position: "relative"}}>
                    <div ref={(ref) => {this.scrollElement = ref}} className={"d-flex flex-row onlineUsers align-items-center p-1"}>
                        {showScrollLeftUserOnline &&
                        <div onClick={() => this.scrollUsersOnline('left', 20, 700)}
                             className={"d-flex align-items-center justify-content-center arrowLeft"}><ChevronLeft
                            size={20}/></div>
                        }
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((user, index) => (
                            <div title={`${user} è online ora!` } key={index} className={"d-flex flex-column userBoxOnline justify-content-center align-items-center"}>
                                <div className={"userOnline"} />
                                <div className={"text-muted"}>
                                    {user}
                                </div>
                            </div>
                        ))}
                        {showScrollRightUserOnline &&
                        <div onClick={() => this.scrollUsersOnline('right', 20, 700)}
                             className={"d-flex align-items-center justify-content-center arrowRight"}><ChevronRight
                            size={20}/></div>
                        }
                        </div>
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
                </div>
            </Fragment>
        )
    }
}

export default GroupChatComponent;
