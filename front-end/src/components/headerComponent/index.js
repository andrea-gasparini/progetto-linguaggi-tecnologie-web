import React, {Component, Fragment} from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({});

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>

            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(HeaderComponent);
