import 'style.css';
import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";

class SettingsComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <HeaderComponent history={history} />
                <p>Hello from settings component!</p>
            </Fragment>
        );
    }

}

export default SettingsComponent;