import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import '../modalsStyle.css';
import {X, XCircle} from "react-feather";
import {
    addUserToInvitations,
    removeUserFromInvitations, resetDataInvitations,
    searchUserForInvitation, sendInvitations, setResultSearchQuery, setSearchQueryUserInvitation
} from "../../../redux/actions/invitations";
import {API_SERVER_URL} from "../../../globalConstants";
import './style.css';

const mapStateToProps = (state) => ({...state.invitationsReducer});

class InviteModalComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clickedToClose: false
        }
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflowY = 'auto';
    }


    checkCloseSearchUserResult = (e) => {
        if(e.target.classList.contains("inviteModal") || e.target.classList.contains("inviteModalTitle") || e.target.classList.contains("usersInvitedList"))
            this.setState({clickedToClose: true});
    };

    checkIfCloseModal = (e) => {
        let {dispatch, closeModal} = this.props;
        if(e.target.classList.contains("modalContainer")) {
            // resetto tutto.
            dispatch(resetDataInvitations(false));
            closeModal();
        }

    };

    sendInvitations = (e) => {
        e.preventDefault();
        let {dispatch, cookies, readyToSendInvite, groupId} = this.props;
        dispatch(sendInvitations(JSON.stringify(readyToSendInvite), groupId, cookies.cookies.token));
    };

    render() {
        let {clickedToClose} = this.state;
        let {searchQuery, groupId, dispatch, cookies, searchQueryResult, readyToSendInvite, usernameListInvitations, closeModal, showSuccessInvitation, showErrorInvitation, errorMessageInvitation} = this.props;
        return(
            <Fragment>
                <section onMouseDown={(e) => this.checkIfCloseModal(e)} className={"d-flex justify-content-center modalContainer"}>
                    <div onClick={(e) => this.checkCloseSearchUserResult(e)} className={"d-flex inviteModal mt-5 align-items-center flex-column"}>
                        <div className={"closeInviteModal"}>
                            <X onClick={() => {closeModal(); dispatch(resetDataInvitations(false));}} />
                        </div>
                        <div className={"text-muted inviteModalTitle"}>
                            Invita amici nel gruppo
                        </div>

                        {showSuccessInvitation &&
                            <div className={"alert alert-success mt-2"}>
                                <b>Inviti inviati con successo.</b>
                            </div>
                        }

                        {showErrorInvitation &&
                            <div className={"alert alert-danger mt-2"}>
                                <b>{errorMessageInvitation}</b>
                            </div>
                        }

                        <form onSubmit={(e) => this.sendInvitations(e)} className={[!showSuccessInvitation && !showErrorInvitation ? "mt-3" : "mt-2"]} style={{width: "calc(100% - 30px)", position: "relative"}}>
                            <div className={"d-flex flex-row usersInvitedList flex-wrap"}>
                                {readyToSendInvite.map((value, index) => (
                                    <div title={value.username} key={index} className={"d-flex userAddedToInvitation align-items-center"} style={{position: "relative"}}>
                                        <div className={"usernameChip"}>
                                            {value.username}
                                        </div>
                                        <XCircle onClick={() => dispatch(removeUserFromInvitations(value.username))} color={"white"} className={"removeChipUser"} size={20}/>
                                    </div>
                                ))}
                            </div>

                            <div className={"form-group"}>
                                <input value={searchQuery} onClick={() => this.setState({clickedToClose: false})} onChange={(e) => {dispatch(searchUserForInvitation(e.target.value, cookies.cookies.token)); this.setState({clickedToClose: false})}} type="text" className={"form-control"} placeholder="Cerca un username oppure un indirizzo email"/>
                            </div>

                            <div className={"searchUserDropdown"} style={{display: searchQuery.length > 0 && !clickedToClose ? "" : "none"}}>

                                {searchQuery.length > 0 && (searchQueryResult.length <= 0 || searchQueryResult.length == usernameListInvitations.length) &&
                                    <div className={"d-flex userSearchResultModalInvite"} style={{width: "100%"}}>
                                        <div className={"userSearchResultModalInviteUsername"}>
                                            Non abbiamo trovato nessun utente con {searchQuery}
                                        </div>
                                    </div>
                                }

                                {searchQuery.length > 0 && searchQueryResult.length > 0 && searchQueryResult.filter(x => usernameListInvitations.indexOf(x.username) < 0).map((value, index) => (
                                    <div onClick={() => {dispatch(addUserToInvitations([{username: value.username, id: value.id}])); this.setState({clickedToClose: true})}} key={index} className={"d-flex userSearchResultModalInvite"} style={{width: "100%"}}>
                                        <div className={"userSearchResultModalInviteImage"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${value.profile_picture}")`, backgroundSize: "cover !important", backgroundRepeat: "no-repeat"}} />
                                        <div className={"userSearchResultModalInviteUsername"}>
                                            {value.username}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={"d-flex form-group justify-content-center"} style={{width: "100%"}}>
                                <button disabled={readyToSendInvite.length <= 0} type={"submit"} className={"btn btn-primary sapienzaButton inviteModalButton"} style={{width: "100%"}}>
                                    {readyToSendInvite.length <= 0 &&
                                        "Aggiungi utenti da invitare"
                                    }

                                    {readyToSendInvite.length == 1 &&
                                        "Invia invito"
                                    }

                                    {readyToSendInvite.length > 1 &&
                                        `Invia invito a ${readyToSendInvite.length} utenti`
                                    }

                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </Fragment>
        )
    }

}

export default withCookies(connect(mapStateToProps)(InviteModalComponent));
