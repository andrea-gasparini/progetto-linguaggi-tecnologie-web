import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import './style.css';
import {Send, Users, Clipboard} from "react-feather";
import CreatePostComponent from "../createPostComponent";
import GroupPostComponent from "../groupPostComponent";
import {loadPosts} from "../../redux/actions/group";
import WallPostsGroupComponent from "../wallPostsGroupComponent";

const mapStateToProps = (state) => ({...state.groupReducer});

class GroupHomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { showActiveMenuItem: true };

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
        let {dispatch, cookies, history, userData} = this.props;
        dispatch(validateToken(cookies, history, false, '/group'));
        dispatch(loadPosts(cookies.cookies.token, 0, 11)); // terzo parametro è il groupId da prendere dinamicamente.
    }

    toggleActiveMenuItem(e) {
        if (! e.target.classList.contains("active"))
            this.setState({showActiveMenuItem: !this.state.showActiveMenuItem})
    }

    changeActiveMenuItem(index) {
        // setta active a false su tutti gli item con index diverso
        this.navigationItems.forEach((val, i) => val.active = i === index);
        // switch page
    }

    render() {
        let {history, groupPosts} = this.props;
        return (
            <Fragment>
                <HeaderComponent history={history} />
                <section className={"d-flex justify-content-center"}>
                    <div className={"home d-flex flex-column"}>
                        <div className={"d-flex mb-3 w-100"}>
                            <CreatePostComponent />
                        </div>
                        <div className={"d-flex flex-row"}>

                            <div className={"left-content mr-3"}>
                                <div className={"navigation-menu noselectText d-flex flex-column align-items-start"}>
                                    {this.navigationItems.map((value, index) =>
                                        <div
                                            onClick={() => this.changeActiveMenuItem(index)}
                                            onMouseOver={(e) => {this.toggleActiveMenuItem(e)}}
                                            onMouseOut={(e) => {this.toggleActiveMenuItem(e)}}
                                            className={["menu-item", this.state.showActiveMenuItem && value.active ? "active" : ""].join(" ")}
                                            key={index}>
                                            {value.icon}
                                            <span>{value.label}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={"main-content d-flex flex-column align-items-center"}>
                                {/*<GroupPostComponent realname={"Andrea Gasparini"} publishDate={"10 Maggio"} text={"Care Studentesse, cari Studenti,\n" +
                                "                            Per accedere ai webinar delle esercitazioni, potete farlo via Classroom o direttamente tramite questo link:\n" +
                                "                            Google Meet: https://meet.google.com/fffffffffff\n" +
                                "                            Saluti,\n" +
                                "                            -- Andrea Gasparini"} />
                                <GroupPostComponent realname={"Edoardo Di Paolo"} username={"admin"} publishDate={"7 Maggio"} />
                                <GroupPostComponent realname={"Andrea Gasparini"} publishDate={"5 Maggio"} text={"Bella bro"} />*/}
                                {this.navigationItems.filter(x => x.active)[0].label === "Bacheca" &&
                                    <WallPostsGroupComponent posts={groupPosts} />
                                }

                                {/* Switch tra componenti da mostrare */

                                }
                            </div>

                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }

}

export default withCookies(connect(mapStateToProps)(GroupHomeComponent));
