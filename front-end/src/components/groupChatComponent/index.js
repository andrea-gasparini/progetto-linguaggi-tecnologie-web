import React, {Component, Fragment} from "react";
import './style.css';
import {Send} from "react-feather";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {getChatMessages, resetChatData, tryAddMessage} from "../../redux/actions/chat";
import {API_SERVER_URL} from "../../globalConstants";

const mapStateToProps = (state) => ({...state.chatReducer});

class GroupChatComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatMessageValue: ''
        }
    }

    async componentDidMount() {
        let {dispatch, cookies, groupId, offsetChatMessages} = this.props;
        await dispatch(getChatMessages(cookies.cookies.token, groupId, offsetChatMessages));
        this.chatMessagesRef.scrollTop = this.chatMessagesRef.scrollHeight;
    }

    componentWillUnmount() {
        let {dispatch} = this.props;
        dispatch(resetChatData());
    }

    checkSendMessage = async (e) => {
        let {dispatch, cookies, groupId} = this.props;
        if(e.keyCode === 13) {
            if(this.state.chatMessageValue.length > 0 && this.state.chatMessageValue.trim().length > 0) {
                await dispatch(tryAddMessage(cookies.cookies.token, this.state.chatMessageValue, groupId));
                this.setState({chatMessageValue: ""});
                this.chatMessagesRef.scrollTop = this.chatMessagesRef.scrollHeight;
            }
        }
    };

    transformDate = (date) => {
        let d = new Date(date);
        let hours = d.getHours() < 10 ?  `0${d.getHours()}` : d.getHours();
        let minutes = d.getMinutes() < 10 ?  `0${d.getMinutes()}` : d.getMinutes();
        return  `${hours}:${minutes}`;
    };

    render() {
        let {chatMessageValue} = this.state;
        let {messages} = this.props;
        return(
            <Fragment>
                <div className={"d-flex flex-row"} style={{width: "100%", position: "relative"}}>
                    <div className={"d-flex chatBox flex-column"}>
                        <div ref={(ref) => this.chatMessagesRef = ref } className={"d-flex chatMessages flex-column"}>
                            {messages.map((value, index) => (
                                <div key={index} className={"d-flex message myMessage"}>
                                    <div className={"userIconMessage"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${value.picture}")`}}/>
                                    <div className={"messageText p-2"}>
                                        <div className={"username"}>{value.username}</div>
                                        <div style={{marginBottom: 10}}>{value.message}</div>
                                        <div className={"hourSentMessage"}>{this.transformDate(value.date)}</div>
                                    </div>
                                </div>
                            ))}

                            {/*<div className={"d-flex message"}>
                                <div className={"userIconMessage"}/>
                                <div className={"messageText p-2 otherMessage"}>
                                    <div className={"username"}>Username</div>
                                    <div>Ciao io sono edoaardo e questo è un messaggio moltoo lungo</div>
                                    <div className={"hourSentMessage"}>18:10</div>
                                </div>
                            </div>*/}
                        </div>
                        <div className={"d-flex sendMessageInput align-items-center justify-content-between"}>
                            <input onChange={(e) => this.setState({chatMessageValue: e.target.value})} value={chatMessageValue} onKeyDown={(e) => this.checkSendMessage(e)} type={"text"} className={"form-control messageInputArea"} placeholder={"Inserisci un messaggio..."} />
                            <Send className={"sendMessageIcon"} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withCookies(connect(mapStateToProps)(GroupChatComponent));
