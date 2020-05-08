import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import './style.css';
import {Send, Users, Clipboard} from "react-feather";
import CreatePostComponent from "../createPostComponent";


class GroupHomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {showActiveMenuItem: true}

        this.navigationItems = [
            {
                label: "Chat",
                icon: <Send/>
            },
            {
                label: "Bacheca",
                icon: <Clipboard/>,
                active: true
            },
            {
                label: "Membri",
                icon: <Users/>
            }
        ];
    }
    
    componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        dispatch(validateToken(cookies, history, false, '/group'));
    }

    toggleActiveMenuItem(e) {
        if (! e.target.classList.contains("active"))
            this.setState({showActiveMenuItem: !this.state.showActiveMenuItem})
    }

    changeActiveMenuItem(index) {
        this.navigationItems.forEach((val, i) => val.active = i === index);
        // switch page
    }

    render() {
        let {history} = this.props;

        return (
            <Fragment>
                <HeaderComponent history={history} />
                <section className={"d-flex justify-content-center"}>
                    <div className={"home d-flex flex-column"}>
                        <div className={"d-flex mb-3 w-100"}>
                            <CreatePostComponent />
                        </div>
                        <div className={"d-flex flex-row"}>
                            <div className={"main-content mr-3 d-flex flex-column align-items-center"}>
                                <h1>Post</h1>
                                {/* Switch tra componenti da mostrare */}
                            </div>
                            <div className={"navigation-menu noselectText d-flex flex-column align-items-start"}>
                                {this.navigationItems.map((value, index) =>
                                    <div
                                        onClick={() => this.changeActiveMenuItem(index)}
                                        onMouseEnter={(e) => {this.toggleActiveMenuItem(e)}}
                                        onMouseLeave={(e) => {this.toggleActiveMenuItem(e)}}
                                        className={["menu-item", this.state.showActiveMenuItem && value.active ? "active" : ""].join(" ")}
                                        key={index}>

                                        {value.icon}
                                        <span>{value.label}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }

}

export default withCookies(connect()(GroupHomeComponent));