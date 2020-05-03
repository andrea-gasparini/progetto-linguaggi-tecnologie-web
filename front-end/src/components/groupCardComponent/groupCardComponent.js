import React, {Component, Fragment} from "react";
import "./style.css";
import {MoreVertical} from "react-feather";

class GroupCardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {groupOwner, groupTitle, groupDescription, openInviteModal, setGroupId, groupId} = this.props;
        return(
            <Fragment>
                <div className={"d-flex groupCard flex-column"}>
                    <div className={"cardGroupHeader"}>
                        <div className={"cardGroupImage"} />
                        <div className={"d-flex justify-content-between pl-3 pr-3 pt-2 align-items-center"} style={{width: "100%"}}>
                            <div title={groupTitle} className={"cardGroupTitle"}>
                                {groupTitle}
                            </div>
                            <div className={"cardGroupOptionsIcon"}>
                                <MoreVertical color={"white"} />
                            </div>
                        </div>
                        <div className={"cardGroupOwner"}>
                            {groupOwner}
                        </div>
                    </div>
                    <div className={"cardGroupBody"}>
                        <div className={"cardGroupDescription pl-3 pr-3 pt-2"}>
                            {groupDescription}
                        </div>
                    </div>
                    <div className={"d-flex cardGroupFooter align-bottom align-items-center justify-content-center"}>
                        <div onClick={() => {openInviteModal(); setGroupId(groupId)}} className={"d-flex inviteFriends align-bottom align-items-center p-2"}>
                            Invita amici nel gruppo
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GroupCardComponent;
