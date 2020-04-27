import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";

const mapStateToProps = (state) => ({});

class InviteModalComponent extends Component {

    render() {
        return(
            <Fragment>

            </Fragment>
        )
    }

}

export default withCookies(connect(mapStateToProps)(InviteModalComponent));
