import React, {Component, Fragment} from "react";
import './style.css'

class LogoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { size: this.props.size === undefined ? 75 : this.props.size };
    }

    render() {
        return(
            <Fragment>
                <div className={"d-flex justify-content-center noselectText"}>
                    <div className={"d-flex logo align-self-center"} style={{width: this.state.size, height: this.state.size}}/>
                    <div className={"d-flex align-self-center text-muted titleLogo"}>
                        Classroom
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default LogoComponent;