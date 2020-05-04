import React, {Component, Fragment} from "react";
import {withCookies} from "react-cookie";
import {X} from "react-feather";
import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";

class DeleteGroupModalComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.style.overflowY = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflowY = 'auto';
    }

    checkCloseModal = (e) => {
        if (e.target.classList.contains("modalContainer")) {
            this.props.closeModal();
        }
    };

    deleteGroup = (e) => {
        e.preventDefault();
        let {groupId, cookies} = this.props;
        axios.post(`${API_SERVER_URL}/deleteGroup`, qs.stringify({groupId}), {
            headers: {
                "Authorization": `Bearer ${cookies.cookies.token}`
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    };

    render() {
        return(
            <Fragment>
                <div onMouseDown={e => this.checkCloseModal(e)} className={"d-flex justify-content-center modalContainer"}>
                    <div className={"d-flex flex-column align-items-center mt-5 modalBox"}>
                        <div className={"closeModal"}>
                            <X onClick={() => this.props.closeModal() } />
                        </div>

                        <span className={"mb-4 text-muted"}>Sei sicuro di voler eliminare questo gruppo?</span>

                        <form className={"createGroupForm"} onSubmit={(e) => this.deleteGroup(e)}>
                            <div className={"d-flex justify-content-center"}>
                                <button
                                    className={"btn btn-primary sapienzaButton"}
                                    type={"submit"}>
                                    Elimina gruppo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withCookies(DeleteGroupModalComponent);
