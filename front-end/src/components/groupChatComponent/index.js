import React, {Component, Fragment} from "react";
import './style.css';
import {Send} from "react-feather";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {addMessageToChat, getChatMessages, resetChatData, setRef, tryAddMessage} from "../../redux/actions/chat";
import {API_SERVER_URL} from "../../globalConstants";
import socket from "../../websocket";

const mapStateToProps = (state) => ({...state.chatReducer, ...state.userReducer});

class GroupChatComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatMessageValue: '',
        };

    }

    async componentDidMount() {
        let {dispatch, cookies, groupId, offsetChatMessages} = this.props;
        await dispatch(getChatMessages(cookies.cookies.token, groupId, offsetChatMessages));
        this.chatMessagesRef.scrollTop = this.chatMessagesRef.scrollHeight;
        this.chatMessagesRef.addEventListener('scroll', this.scrollingChat);
        dispatch(setRef(this.chatMessagesRef));
        socket.emit('handshakeUser', {...this.props.userData.viewer, token: cookies.cookies.token}); // il socket si connette e viene "registrato" nel server
        socket.emit('joinChat', {groupId}); // joina nella chat
        socket.on('handleNewMessage', (data) => {
            // dobbiamo gestire il nuovo messaggio.
            // l'unica cosa che dobbiamo aggiungere al data che ci arriva è se il messaggio è mio oppure no.
            data.ismine = data.userId === this.props.userData.viewer.id ? "t" : "f"; // controlliamo che l'userId ricevuto dal data sia === al mio userId.
            if(this.props.messages.filter(x => x.id === data.id) <= 0)
                dispatch(addMessageToChat(data));
            // aggiorniamo l'altezza dello scroll.
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.messages.length !== prevProps.messages.length) {
            this.chatMessagesRef.scrollTop = this.chatMessagesRef.scrollHeight;
        }
    }

    componentWillUnmount() {
        this.chatMessagesRef.removeEventListener('scroll', this.scrollingChat);
        let {dispatch, groupId} = this.props;
        socket.emit('leaveRoom', {groupId}); // dobbiamo lasciare la chat.
    }

    scrollingChat = async () => {
        let {dispatch, cookies, groupId, offsetChatMessages, canLoadOtherMessagesChat, isRequestingChatMessages} = this.props;

        if(this.chatMessagesRef.scrollTop < 400 && !isRequestingChatMessages && canLoadOtherMessagesChat) {
            let scrollTop = this.chatMessagesRef.scrollTop;
            let scrollHeight = this.chatMessagesRef.scrollHeight;
            this.setState({isRequestingMessages: true});
            await dispatch(getChatMessages(cookies.cookies.token, groupId, offsetChatMessages));
            this.chatMessagesRef.scrollTop = this.chatMessagesRef.scrollHeight - scrollHeight + scrollTop;
        }
    };


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
        return  `${d.toLocaleTimeString().substr(0, 5)}`;
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
                                <div key={value.id} className={["d-flex message", value.ismine === "t" ? "myMessage" : ""].join(" ")}>
                                    <div className={"userIconMessage"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${value.picture}")`}}/>
                                    <div className={["messageText p-2", value.ismine !== "t" ? "otherMessage" : ""].join(" ")}>
                                        <div className={"username"}>{value.username}</div>
                                        <div style={{marginBottom: 10}}>{value.message}</div>
                                        <div className={"hourSentMessage"}>{this.transformDate(value.date)}</div>
                                    </div>
                                </div>
                            ))}
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
