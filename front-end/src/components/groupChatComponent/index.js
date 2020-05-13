import React, {Component, Fragment} from "react";
import './style.css';
import {ChevronLeft, ChevronRight} from "react-feather";

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
                    <div ref={(ref) => {this.scrollElement = ref}} className={"d-flex flex-row onlineUsers align-items-center p-3"}>
                        {showScrollLeftUserOnline &&
                        <div onClick={() => this.scrollUsersOnline('left', 20, 700)}
                             className={"d-flex align-items-center justify-content-center arrowLeft"}><ChevronLeft
                            size={20}/></div>
                        }
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((user, index) => (
                            <div key={index} className={"d-flex flex-column userBoxOnline justify-content-center align-items-center"}>
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
                </div>
            </Fragment>
        )
    }
}

export default GroupChatComponent;
