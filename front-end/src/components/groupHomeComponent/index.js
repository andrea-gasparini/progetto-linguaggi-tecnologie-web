import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import './style.css';
import {Send, Users, Clipboard} from "react-feather";


class GroupHomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        dispatch(validateToken(cookies, history, false, '/group'));
    }

    render() {
        let {history} = this.props;

        return (
            <Fragment>
                <HeaderComponent history={history} />
                <section className={"d-flex justify-content-center"}>
                    <div className={"home d-flex flex-column"}>
                        <div className={"mb-3"}>
                            <h1>Componente per la creazione di postaaaaaaaaaaa</h1>
                        </div>
                        <div className={"d-flex flex-row"}>
                            <div className={"main-content mr-2 d-flex flex-column align-items-center"}>
                                <h1>Post</h1>
                            </div>
                            <div className={"navigation-menu noselectText ml-2 d-flex flex-column"}>
                                <div className={"menu-item"}>
                                    <Send />
                                    <span>Chat</span>
                                </div>
                                <div className={"menu-item"}>
                                    <Clipboard />
                                    <span>Bacheca</span>
                                </div>
                                <div className={"menu-item"}>
                                    <Users />
                                    <span>Membri</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }

}

export default withCookies(connect()(GroupHomeComponent));