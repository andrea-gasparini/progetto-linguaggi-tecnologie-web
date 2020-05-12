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
import GroupChatComponent from "../groupChatComponent";

const mapStateToProps = (state) => ({...state.groupReducer});

class GroupHomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { showActiveMenuItem: true, isLoadingPost: false, activeIndex: 1 };

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
        document.addEventListener('scroll', this.checkScroll);
        let {dispatch, cookies, history, userData, match} = this.props;
        dispatch(validateToken(cookies, history, false, `/group/${match.params.id}`));
        dispatch(loadPosts(cookies.cookies.token, 0, match.params.id)); // terzo parametro è il groupId da prendere dinamicamente.
    }

    toggleActiveMenuItem(e) {
        if (! e.target.classList.contains("active"))
            this.setState({showActiveMenuItem: !this.state.showActiveMenuItem})
    }

    changeActiveMenuItem(index) {
        // setta active a false su tutti gli item con index diverso
        //this.navigationItems.forEach((val, i) => val.active = i === index);
        this.setState({activeIndex: index});
        // switch page
    }

    getActivePage() { return this.navigationItems[this.state.activeIndex].label; }

    componentWillUnmount() {
        document.addEventListener('scroll', this.checkScroll);
    }

    checkScroll = async () => {
        let {isLoadingPost} = this.state;
        let {dispatch, cookies, currentOffset, hasOtherPostsToLoad, match} = this.props;
        let distanceBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;
        if(distanceBottom < 100 && this.getActivePage() === "Bacheca" && !isLoadingPost && hasOtherPostsToLoad) {
            this.setState({isLoadingPost: true});
            await dispatch(loadPosts(cookies.cookies.token, currentOffset, match.params.id));
        }
        setTimeout(() => {
            this.setState({isLoadingPost: false});
        }, 1500); // cooldown request: dopo 1500 ms si resetta e si potàr rifare un'altra richiesta.
    };

    render() {
        let {history, groupPosts, match} = this.props;
        return (
            <Fragment>
                <HeaderComponent history={history} />
                <section className={"d-flex justify-content-center"}>
                    <div className={"home d-flex flex-column"}>
                        {this.getActivePage() === "Bacheca" &&
                            <div className={"d-flex mb-3 w-100"}>
                                <CreatePostComponent groupId={match.params.id}/>
                            </div>
                        }
                        <div className={"d-flex flex-row"}>

                            <div className={"left-content mr-3"}>
                                <div className={"navigation-menu noselectText d-flex flex-column align-items-start"}>
                                    {this.navigationItems.map((value, index) =>
                                        <div
                                            onClick={() => this.changeActiveMenuItem(index)}
                                            onMouseOver={(e) => {this.toggleActiveMenuItem(e)}}
                                            onMouseOut={(e) => {this.toggleActiveMenuItem(e)}}
                                            className={["menu-item", this.state.showActiveMenuItem && index === this.state.activeIndex ? "active" : ""].join(" ")}
                                            key={index}>
                                            {value.icon}
                                            <span>{value.label}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={"main-content d-flex flex-column align-items-center"}>
                                {this.getActivePage() === "Bacheca" &&
                                    <WallPostsGroupComponent posts={groupPosts} />
                                }

                                {this.getActivePage() === "Chat" &&
                                    <GroupChatComponent />
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
