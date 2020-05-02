import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import './style.css';
import {Bell} from "react-feather";
import DropDownInvitations from "../dropdownInvitations";
import {getMyInvitation} from "../../redux/actions/invitations";
import {withCookies} from "react-cookie";

const mapStateToProps = (state) => ({...state.userReducer, ...state.invitationsReducer});

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentActive: 'Home', // fisso per test
            showActive: true,
            showShadow: false
        };

        this.navigationElements = [
            {
                text: "I miei gruppi",
                path: "/home",
                pathName: "Home"
            },

            {
                text: "Impostazioni",
                path: "/settings",
                pathName: "Settings"
            },

            {
                text: "Esci",
                path: "/logout",
                pathName: "Logout"
            }
        ]
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollBody);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollBody);
    }

    scrollBody = () => {
        if(document !== undefined && document.documentElement.scrollTop > 0)
            this.setState({showShadow: true});
        else
            this.setState({showShadow: false});
    };

    switchActive = (e) => {
        let tg = e.target;

        if(!tg.classList.contains("active"))
            this.setState({showActive: !this.state.showActive});
    };

    switchNavigationPage = (pathName, path) => {
        this.setState({currentActive: pathName});
    };

    render() {
        let {currentActive, showActive, showShadow} = this.state;
        let {userData, dispatch, cookies, loadingMyInvitation} = this.props;
        return(
            <Fragment>
                <nav className={["d-flex navbar navbarClassroom justify-content-center", showShadow ? "navbarScrollShadow" : ""].join(" ")}>
                    <div className={"d-flex navbarContainer justify-content-around"}>
                        <div className={"logo"} style={{width: 50, height: 50}} />
                        <ul className={"d-flex navbar-nav flex-row align-items-center"}>
                            {this.navigationElements.map((value, index) => (
                                <li onClick={(e) => this.switchNavigationPage(value.pathName, value.path)} key={index} className={"navbarElement"}>
                                    <div onMouseLeave={(e) => this.switchActive(e)} onMouseEnter={(e) => this.switchActive(e)} className={["navbarText", currentActive === value.pathName && showActive ? "active" : ""].join(" ")}>
                                        {value.text}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {typeof userData !== "undefined" &&
                            <div data-count={userData.userNotifications}
                                 className={["invitationsIcon", userData.userNotifications <= 0 ? "hideAfter" : ""].join(" ")}>
                                <Bell onClick={() => dispatch(getMyInvitation(cookies.cookies.token))} />
                                <DropDownInvitations userInvitations={userData.invitationsList} loadingMyInvitation={loadingMyInvitation} />
                            </div>
                        }
                    </div>
                </nav>
            </Fragment>
        )
    }
}

export default withCookies(connect(mapStateToProps)(HeaderComponent));
