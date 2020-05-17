import './style.css';
import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {validateToken} from "../../redux/actions/login";
import {API_SERVER_URL} from "../../globalConstants";

const mapStateToProps = (state) => ({...state.userReducer});

class SettingsComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        dispatch(validateToken(cookies, history, false, '/settings'));
    }

    render() {
        let {history, userData} = this.props;

        return (typeof userData !== "undefined") ?
            (
                <Fragment>
                    <HeaderComponent history={history} />
                    <section className={"d-flex flex-column align-items-center justify-content-center"}>
                        <div className={"d-flex flex-column align-items-center settingsContainer"}>
                            <div className={"profilePic"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${userData.viewer.picture}")`}}  />
                            <p>Hello from settings component!</p>
                        </div>
                    </section>
                </Fragment>
            )
        : <Fragment />
    }

}

export default withCookies(connect(mapStateToProps)(SettingsComponent));