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
import FooterComponent from "../footerComponent";
import {resetChatData} from "../../redux/actions/chat";
import GroupMembersComponent from "../groupMembersComponent";

const mapStateToProps = (state) => ({...state.groupReducer, ...state.chatReducer, ...state.userReducer});


class GroupHomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { showActiveMenuItem: true, isLoadingPost: false, activeIndex: 1, validated: false };

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

    async componentDidMount() {
        document.addEventListener('scroll', this.checkScroll);
        let {dispatch, cookies, history, match} = this.props;
        await dispatch(validateToken(cookies, history, false, `/group/${match.params.id}`));
        if(this.state.activeIndex === 1)
            await dispatch(loadPosts(cookies.cookies.token, 0, match.params.id)); // terzo parametro è il groupId da prendere dinamicamente.

        let {userData} = await this.props;
        if(userData.userGroups.filter(x => x.id === match.params.id) <= 0)
            history.push('/');

        this.setState({validated: true});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {dispatch, cookies, match} = this.props;
        if(this.state !== prevState && this.state.activeIndex !== prevState.activeIndex && this.state.activeIndex === 1)
            dispatch(loadPosts(cookies.cookies.token, 0, match.params.id));

        if(this.state !== prevState && this.state.activeIndex !== prevState.activeIndex && prevState.activeIndex === 0)
            dispatch(resetChatData());
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
        if(this.state.validated) {
            let {history, groupPosts, match, dispatch} = this.props;
            return (
                <Fragment>
                    <HeaderComponent history={history}/>
                    <section className={"d-flex justify-content-center"}>
                        <div className={"home d-flex flex-column"}>
                            {this.getActivePage() === "Bacheca" &&
                            <div className={"d-flex mb-3 w-100"}>
                                <CreatePostComponent groupId={match.params.id}/>
                            </div>
                            }
                            <div className={"d-flex flex-row"}>

                                <div className={"left-content mr-3"}>
                                    <div className={"left-sticky"}>
                                        <div
                                            className={"navigation-menu noselectText d-flex flex-column align-items-start"}>
                                            {this.navigationItems.map((value, index) =>
                                                <div
                                                    onClick={() => this.changeActiveMenuItem(index)}
                                                    onMouseOver={(e) => {
                                                        this.toggleActiveMenuItem(e)
                                                    }}
                                                    onMouseOut={(e) => {
                                                        this.toggleActiveMenuItem(e)
                                                    }}
                                                    className={["menu-item", this.state.showActiveMenuItem && index === this.state.activeIndex ? "active" : ""].join(" ")}
                                                    key={index}>
                                                    {value.icon}
                                                    <span>{value.label}</span>
                                                </div>
                                            )}
                                        </div>
                                        <FooterComponent left={true} />
                                    </div>
                                </div>

                                <div className={"main-content d-flex flex-column align-items-center"}>
                                    {this.getActivePage() === "Bacheca" &&
                                    <WallPostsGroupComponent groupId={match.params.id} dispatch={dispatch}
                                                             posts={groupPosts}/>
                                    }

                                    {this.getActivePage() === "Chat" &&
                                    <GroupChatComponent groupId={match.params.id}/>
                                    }

                                    {this.getActivePage() === "Membri" &&
                                        <GroupMembersComponent groupId={match.params.id}/>
                                    }

                                </div>

                            </div>
                        </div>
                    </section>
                </Fragment>
            );
        } else {
            return(
                <Fragment>

                </Fragment>
            )
        }
    }

}

export default withCookies(connect(mapStateToProps)(GroupHomeComponent));
