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
                    <div className={["dropdownNotificationContainer"].join(" ")}>
                        {[0, 1, 2, 3, 4, 5,7, 8, 9, 10].map(v => (
                            <div>
                                ciao
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DropDownInvitations;
