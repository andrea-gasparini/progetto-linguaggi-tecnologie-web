import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <HeaderComponent />
            </Fragment>
        )
    }
}

export default HomeComponent;
