import React, {Component, Fragment} from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import qs from "querystring";
import './style.css';
import {API_SERVER_URL} from "../../../globalConstants";

class CreateGroupModalComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupName: "",
            groupDesc: "",
            groupNameHasError: false,
            groupDescHasError: false,
            messageCreateGroupError: ""
        }
    }

    componentDidMount() {
        document.body.style.overflowY = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflowY = 'auto';
    }

    createGroup = (e) => {
        e.preventDefault();

        let { groupName, groupDesc } = this.state;

        axios.post(
            `${API_SERVER_URL}/createGroup`,
            qs.stringify({groupName, groupDesc}),
            { headers: { "Authorization": `Bearer ${this.props.cookies.cookies.token}` } }
        ).then( (res) => {
            let {status, message, data} = res.data;
            if(!status)
                this.setState({messageCreateGroupError: message, ...data});
        }).catch( (err) => { console.log(err); });
    };

    render() {

        let { groupNameHasError, groupDescHasError, groupName, messageCreateGroupError } = this.state;

        return(
            <Fragment>
                <div className={"d-flex justify-content-center modalContainer"}>
                    <div className={"d-flex flex-column align-items-center mt-5 modalBox"}>
                        <span className={"mb-4 modalTitle"}>Crea un nuovo gruppo</span>
                        <form className={"createGroupForm"} onSubmit={(e) => this.createGroup(e)}>
                            <div className={"form-group"}>
                                <input
                                    className={["form-control", groupNameHasError ? "is-invalid" : ""].join(" ")}
                                    placeholder={"Nome del gruppo"}
                                    onChange={e => this.setState({groupName: e.target.value})} />

                                {groupNameHasError &&
                                <div className={"invalid-feedback"}>
                                    {messageCreateGroupError}
                                </div>
                                }

                            </div>

                            <div className={"form-group"}>
                                <textarea
                                    onChange={(e) => this.setState({groupDesc: e.target.value})}
                                    className={["form-control", groupDescHasError ? "is-invalid" : ""].join(" ")}
                                    placeholder={"Descrizione del gruppo"}
                                    maxLength={255}/>

                                {groupDescHasError &&
                                <div className={"invalid-feedback"}>
                                    {messageCreateGroupError}
                                </div>
                                }

                            </div>

                            <div className={"d-flex justify-content-center"}>
                                <button
                                    disabled={groupName.length < 1}
                                    className={"btn btn-primary sapienzaButton"}
                                    type={"submit"}>
                                    Crea gruppo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default withCookies(CreateGroupModalComponent);
