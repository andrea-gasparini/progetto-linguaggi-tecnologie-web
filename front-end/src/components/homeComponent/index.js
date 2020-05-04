import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import './style.css';
import GroupCardComponent from "../groupCardComponent/groupCardComponent";
import {PlusCircle} from "react-feather";
import InviteModalComponent from "../modalsComponents/inviteModalComponent";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {validateToken} from "../../redux/actions/login";
import CreateGroupModalComponent from "../modalsComponents/createGroupModalComponent";
import DeleteGroupModalComponent from "../modalsComponents/deleteGroupModalComponent";

const mapStateToProps = (state) => ({...state.userReducer});

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInviteModal: false,
            showCreateGroupModal: false,
            showDeleteGroupModal: false,
            currentGroupId: -1,
            deleteGroupId: -1
        }
    }

    componentDidMount() {
        let {dispatch, cookies, history, location} = this.props;
        dispatch(validateToken(cookies, history));
    }

    showInviteModal = () =>  {
        this.setState({showInviteModal: !this.state.showInviteModal});
    };

    toggleCreateGroupModal = () => { this.setState({ showCreateGroupModal: ! this.state.showCreateGroupModal } ) }

    showDeleteGroupModal = () => {
        this.setState({showDeleteGroupModal: !this.state.showDeleteGroupModal});
    };

    setGroupId = (groupId) => {
        this.setState({currentGroupId: groupId});
    };

    setDeleteGroupId = (groupId) => {
        this.setState({deleteGroupId: groupId});
    };

    render() {
        let {showCreateGroupModal, showInviteModal, currentGroupId, showDeleteGroupModal, deleteGroupId} = this.state;
        let {userData, history} = this.props;
        return(
            <Fragment>
                <HeaderComponent history={history} />
                <section className={"d-flex justify-content-center"}>
                    <div className={"d-flex homeContainerGroups flex-column"}>
                        <div className={"d-flex myGroupsTitle text-muted justify-content-between"}>
                            <div className={"groupsCount"}>
                                I miei gruppi ({typeof userData !== "undefined" ? userData.userGroups.length : 0})
                            </div>
                            <div className={"createGroupText"} onClick={this.toggleCreateGroupModal}>
                                Crea un gruppo
                                <PlusCircle style={{marginLeft: 5}} />
                            </div>
                        </div>

                        <div className={"d-flex flex-row flex-wrap groupsList mb-5"}>
                            {typeof userData !== "undefined" && userData.userGroups.map((value, index) => (
                                <GroupCardComponent deleteGroupId={this.setDeleteGroupId} openDeleteModal={this.showDeleteGroupModal} viewerId={userData.viewer.id} ownerId={value.ownerId} ownerPicture={value.ownerPicture} groupDescription={value.description} groupOwner={value.owner} setGroupId={this.setGroupId} groupId={value.id} openInviteModal={this.showInviteModal} groupTitle={value.group_title} key={index} />
                            ))}

                            {(typeof userData === "undefined" || userData.userGroups.length <= 0) &&
                                <div className={"d-flex align-content-center text-muted justify-content-center mt-5"} style={{width: "100%"}}>
                                Al momento non fai parte di alcun gruppo.
                                </div>
                            }
                        </div>
                    </div>
                </section>
                {showInviteModal &&
                    <InviteModalComponent groupId={currentGroupId} closeModal={this.showInviteModal} />
                }
                {showCreateGroupModal &&
                    <CreateGroupModalComponent closeModal={this.toggleCreateGroupModal}/>
                }
                {showDeleteGroupModal &&
                    <DeleteGroupModalComponent closeModal={this.showDeleteGroupModal} groupId={deleteGroupId} />
                }
            </Fragment>
        )
    }
}

export default withCookies(connect(mapStateToProps)(HomeComponent));
