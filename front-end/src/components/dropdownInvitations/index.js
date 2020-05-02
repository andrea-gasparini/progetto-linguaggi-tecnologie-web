import React, {Component, Fragment} from "react";
import './style.css'

class DropDownInvitations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <div className={["dropdownNotification"].join(" ")}>
                    <div className={["dropdownNotificationContainer d-flex", true ? "align-items-center justify-content-center" : ""].join(" ")}>
                        {/*[0, 1, 2, 3, 4, 5,7, 8, 9, 10].map(v => (
                            <div>
                                ciao
                            </div>
                        ))*/}

                        <div className="spinner-border" role="status" style={{color: "#822433"}}>
                            <span className="sr-only">Loading...</span>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DropDownInvitations;
