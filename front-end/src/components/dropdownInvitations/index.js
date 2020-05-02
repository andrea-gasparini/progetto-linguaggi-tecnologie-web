import React, {Component, Fragment} from "react";
import './style.css'
import {CheckCircle, XCircle} from "react-feather";
import {replyToInvitation} from "../../redux/actions/invitations";

class DropDownInvitationsComponent extends Component {
    constructor(props) {
        super(props);
    }

    buildText = (users, groupName) => {
        users = JSON.parse(users);
        if(users.length == 1) {
            return `<b>${users[0]}</b> ti ha invitato ad unirti al gruppo <b>${groupName}</b>.`
        } else if(users.length == 2) {
            return `<b>${users[0]}</b> e <b>${users[1]}</b> ti hanno invitato ad unirti al gruppo <b>${groupName}.</b>`;
        } else {
            return `<b>${users[0]}, ${users[1]}</b> e ${users.length - 2 > 1 ? `<b>altri ${users.length - 2}</b> utenti` : `<b>un altro</b> utente`} ti hanno invitato ad unirti al gruppo <b>${groupName}</b>.`
        }
    };

    render() {
        let {loadingMyInvitation, userInvitations, dispatch, token} = this.props;
        return(
            <Fragment>
                <div className={["dropdownNotification"].join(" ")}>
                    <div className={["dropdownNotificationContainer d-flex flex-column", loadingMyInvitation ? "align-items-center justify-content-center" : ""].join(" ")}>
                        {!loadingMyInvitation && typeof userInvitations !== "undefined" && userInvitations.map((value, index) => (
                            <div key={index} className={"d-flex p-2 invitationElement justify-content-between"}>
                                <div dangerouslySetInnerHTML={{__html: this.buildText(value.users, value.group_title)}} style={{marginRight: 5, fontSize: 15}}>
                                </div>
                                <div className={"d-flex flex-row align-items-center"}>
                                    <CheckCircle onClick={() => dispatch(replyToInvitation(token, 1, 1))} color={"#155724"} className={"invitationIcon"} />
                                    <XCircle onClick={() => dispatch(token, 1, 0)} color={"#721c24"} className={"invitationIcon"} />
                                </div>
                            </div>
                        ))}
                        {loadingMyInvitation &&
                            <div className="spinner-border" role="status" style={{color: "#822433"}}>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DropDownInvitationsComponent;
