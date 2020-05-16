import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import './style.css';
import {Bell} from "react-feather";
import DropDownInvitationsComponent from "../dropdownInvitations";
import {getMyInvitation} from "../../redux/actions/invitations";
import {withCookies} from "react-cookie";
import DropDownInvitations from "../dropdownInvitations";
import LogoComponent from "../logoComponent";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => ({...state.userReducer, ...state.invitationsReducer});

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentActive: 'Home', // fisso per test
            showActive: true,
            showShadow: false,
            showDropdown: false
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
                path: "/",
                pathName: "Logout"
            }
        ]
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollBody);
        window.addEventListener('click', this.checkClick);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollBody);
        window.removeEventListener('click', this.checkClick);
    }

    checkClick = (e) => {
        let dropdown = document.getElementsByClassName("invitationsIcon")[0];
        if(dropdown !== e.target && !dropdown.contains(e.target) && this.state.showDropdown)
            this.setState({showDropdown: false});
    };

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
        let {history} = this.props;

        if (pathName === "Logout")
            document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        else
            this.setState({currentActive: pathName});

        history.push(path);
    };

    render() {
        let {currentActive, showActive, showShadow, showDropdown} = this.state;
        let {userData, dispatch, cookies, loadingMyInvitation} = this.props;
        return(
            <Fragment>
                <nav className={["d-flex navbar navbarClassroom justify-content-center", showShadow ? "navbarScrollShadow" : ""].join(" ")}>
                    <div className={"d-flex navbarContainer justify-content-around"}>
                        <LogoComponent size={50}/>
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
                                <Bell onClick={() => {this.setState({showDropdown: !this.state.showDropdown}); dispatch(getMyInvitation(cookies.cookies.token)); }} />
                                {showDropdown &&
                                    <DropDownInvitationsComponent token={cookies.cookies.token} dispatch={dispatch}
                                                                  userInvitations={userData.invitationsList}
                                                                  loadingMyInvitation={loadingMyInvitation}/>
                                }
                            </div>
                        }
                    </div>
                </nav>
            </Fragment>
        )
    }
}

export default withCookies(connect(mapStateToProps)(HeaderComponent));
