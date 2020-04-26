import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import './style.css';

const mapStateToProps = (state) => ({});

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentActive: 'Home', // fisso per test
            showActive: true
        }
    }

    switchActive = (e) => {
        let tg = e.target;
        if(!tg.classList.contains("active"))
            this.setState({showActive: !this.state.showActive});
    };

    render() {
        let {currentActive, showActive} = this.state;
        return(
            <Fragment>
                <nav className={"d-flex navbar navbarClassroom justify-content-center"}>
                    <div className={"d-flex navbarContainer justify-content-around"}>
                        <div className={"logo"} style={{width: 50, height: 50}} />
                        <ul className={"d-flex navbar-nav flex-row align-items-center"}>
                            <li className={"navbarElement"}>
                                <div onMouseLeave={(e) => this.switchActive(e)} onMouseEnter={(e) => this.switchActive(e)} className={["navbarText", currentActive === "Home" && showActive ? "active" : ""].join(" ")}>
                                    I miei gruppi
                                </div>
                            </li>
                            <li className={"navbarElement"}>
                                <div onMouseLeave={(e) => this.switchActive(e)} onMouseEnter={(e) => this.switchActive(e)} className={"navbarText"}>
                                    Impostazioni
                                </div>
                            </li>

                            <li className={"navbarElement"}>
                                <div onMouseLeave={(e) => this.switchActive(e)} onMouseEnter={(e) => this.switchActive(e)} className={"navbarText"}>
                                    Esci
                                </div>
                            </li>
                        </ul>

                        <div className={"btn btn-primary sapienzaButton"}>
                            Unisciti ad un gruppo
                        </div>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(HeaderComponent);
