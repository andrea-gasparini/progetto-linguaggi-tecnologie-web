import React, {Component, Fragment} from "react";
import './style.css';
import {API_SERVER_URL} from "../../globalConstants";
import axios from "axios";
import {withCookies} from "react-cookie";
import qs from "querystring";

class GroupMembersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { users: [] }
    }

    componentDidMount() {
        this.getUsersRequest();
    }

    getUsersRequest() {
        let {groupId, cookies} = this.props;

        axios.post(`${API_SERVER_URL}/getUsers`,
            qs.stringify({groupId}),
            { headers: { "Authorization": `Bearer ${cookies.cookies.token}` }
        }).then(res => this.setState({users: res.data.data}));
    }

    render() {
        let {users} = this.state;

        return (
            <Fragment>
                <section className={"d-flex flex-wrap"}>
                    {users.map((value, index) =>
                        <div className={"user"} key={index}>
                            <div className={"userPic"} style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${value.profile_picture}")`}} />
                            <span>{value.realname}</span>
                        </div>
                    )}
                </section>
            </Fragment>
        )
    }
}

export default withCookies(GroupMembersComponent);