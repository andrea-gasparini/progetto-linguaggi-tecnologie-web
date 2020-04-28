import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import '../modalsStyle.css';
import {X, XCircle} from "react-feather";
import {
    addUserToInvitations,
    removeUserFromInvitations,
    searchUserForInvitation
} from "../../../redux/actions/invitations";

const mapStateToProps = (state) => ({...state.invitationsReducer});

class InviteModalComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clickedToClose: false
        }
    }


    checkCloseSearchUserResult = (e) => {
        if(e.target.classList.contains("inviteModal") || e.target.classList.contains("inviteModalTitle") || e.target.classList.contains("usersInvitedList"))
            this.setState({clickedToClose: true});
    };

    render() {
        let {clickedToClose} = this.state;
        let {searchQuery, dispatch, cookies, searchQueryResult, readyToSendInvite, usernameListInvitations} = this.props;
        return(
            <Fragment>
                <section className={"d-flex justify-content-center modalContainer"}>
                    <div onClick={(e) => this.checkCloseSearchUserResult(e)} className={"d-flex inviteModal mt-5 align-items-center justify-content-center flex-column"}>
                        <div className={"closeInviteModal"}>
                            <X />
                        </div>
                        <div className={"text-muted inviteModalTitle"}>
                            Invita amici nel gruppo
                        </div>
                        <form className={"mt-3"} style={{width: "calc(100% - 30px)", position: "relative"}}>

                            <div className={"d-flex flex-row usersInvitedList"}>
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
                                <input onClick={() => this.setState({clickedToClose: false})} onChange={(e) => {dispatch(searchUserForInvitation(e.target.value, cookies.cookies.token)); this.setState({clickedToClose: false})}} type="text" className={"form-control"} placeholder="Cerca un username oppure un indirizzo email"/>
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
                                        <div className={"userSearchResultModalInviteImage"}/>
                                        <div className={"userSearchResultModalInviteUsername"}>
                                            {value.username}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={"d-flex form-group justify-content-center"} style={{width: "100%"}}>
                                <button disabled={readyToSendInvite.length <= 0} className={"btn btn-primary sapienzaButton inviteModalButton"} style={{width: "100%"}}>Invia invito</button>
                            </div>
                        </form>
                    </div>
                </section>
            </Fragment>
        )
    }

}

export default withCookies(connect(mapStateToProps)(InviteModalComponent));
