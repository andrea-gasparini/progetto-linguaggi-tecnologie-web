import React, {Component, Fragment} from "react";
import "./style.css";
import {MoreVertical} from "react-feather";

class GroupCardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <div className={"d-flex groupCard flex-column"}>
                    <div className={"cardGroupHeader"}>
                        <div className={"cardGroupImage"} />
                        <div className={"d-flex justify-content-between pl-3 pr-3 pt-2 align-items-center"} style={{width: "100%"}}>
                            <div className={"cardGroupTitle"}>
                                Titolo g ciao molto moltooooo lungo
                            </div>
                            <div className={"cardGroupOptionsIcon"}>
                                <MoreVertical color={"white"} />
                            </div>
                        </div>
                        <div className={"cardGroupOwner"}>
                            Edoardo Di Paolo
                        </div>
                    </div>
                    <div className={"cardGroupBody"}>
                        <div className={"cardGroupDescription pl-3 pr-3 pt-2"}>
                            Qui una descrizione del gruppo bla bla bla bla
                        </div>
                    </div>
                    <div className={"d-flex cardGroupFooter align-bottom align-items-center justify-content-center"}>
                        <div className={"d-flex inviteFriends align-bottom align-items-center p-2"}>
                            Invita amici nel gruppo
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GroupCardComponent;
