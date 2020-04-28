import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import '../modalsStyle.css';
import {X} from "react-feather";

const mapStateToProps = (state) => ({});

class InviteModalComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchUser: ''
        }
    }


    render() {
        let {searchUser} = this.state;

        return(
            <Fragment>
                <section className={"d-flex justify-content-center modalContainer"}>
                    <div className={"d-flex inviteModal mt-5 align-items-center justify-content-center flex-column"}>
                        <div className={"closeInviteModal"}>
                            <X />
                        </div>
                        <div className={"text-muted inviteModalTitle"}>
                            Invita amici nel gruppo
                        </div>
                        <form className={"mt-3"} style={{width: "calc(100% - 30px)", position: "relative"}}>
                            <div className={"form-group"}>
                                <input onChange={(e) => this.setState({searchUser: e.target.value})} type="text" className={"form-control"}
                                       aria-describedby="emailHelp" placeholder="Cerca un username oppure un indirizzo email"/>
                            </div>

                            <div className={"searchUserDropdown"} style={{display: searchUser.length > 0 ? "" : "none"}}>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
                                    <div key={index} className={"d-flex userSearchResultModalInvite"} style={{width: "100%"}}>
                                        <div className={"userSearchResultModalInviteImage"}/>
                                        <div className={"userSearchResultModalInviteUsername"}>
                                            Username
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className={"d-flex form-group justify-content-center"} style={{width: "100%"}}>
                                <button className={"btn btn-primary sapienzaButton inviteModalButton"} style={{width: "100%"}}>Invia invito</button>
                            </div>
                        </form>
                    </div>
                </section>
            </Fragment>
        )
    }

}

export default withCookies(connect(mapStateToProps)(InviteModalComponent));
