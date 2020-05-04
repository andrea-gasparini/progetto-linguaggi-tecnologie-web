import React, {Component, Fragment} from "react";
import {withCookies} from "react-cookie";
import {X} from "react-feather";
import axios from "axios";
import {API_SERVER_URL} from "../../../globalConstants";
import qs from "querystring";
import {connect} from "react-redux";
import {removeGroup} from "../../../redux/actions/user";

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
            let {status} = res.data;
            if(status)
                this.showSuccess();
        }).catch((err) => {
            console.log(err);
        })
    };

    showSuccess = () => {
        this.setState({showSuccess: true});
        let {groupId, dispatch} = this.props;
        dispatch(removeGroup(groupId));
    };

    render() {
        let {showSuccess} = this.state;
        return(
            <Fragment>
                <div onMouseDown={e => this.checkCloseModal(e)} className={"d-flex justify-content-center modalContainer"}>
                    <div className={"d-flex flex-column align-items-center mt-5 modalBox"}>
                        <div className={"closeModal"}>
                            <X onClick={() => this.props.closeModal() } />
                        </div>

                        {!showSuccess &&
                            <Fragment>
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
                            </Fragment>
                        }

                        {showSuccess &&
                            <div className="alert alert-success" role="alert">
                                Gruppo eliminato con successo.
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withCookies(connect()(DeleteGroupModalComponent));
