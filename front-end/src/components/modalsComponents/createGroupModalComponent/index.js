import React, {Component, Fragment} from "react";
import { withCookies } from "react-cookie";
import './style.css';

class CreateGroupModalComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupName: "",
            groupDesc: ""
        }
    }

    componentDidMount() {
        document.body.style.overflowY = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflowY = 'auto';
    }

    createGroup = () => {}; // POST

    render() {
        return(
            <Fragment>
                <div className={"d-flex justify-content-center modalContainer"}>
                    <div className={"d-flex flex-column align-items-center mt-5 createGroupModal"}>
                        <h2 className={"mb-4"}>Crea un nuovo gruppo</h2>
                        <form className={"createGroupForm"} onSubmit={() => this.createGroup()}>
                            <input className={"form-control"} placeholder={"Nome del gruppo"} />
                            <textarea className={"form-control"} placeholder={"Descrizione del gruppo"} maxLength={255}/>
                            <div className={"d-flex justify-content-center"}>
                                <button className={"btn btn-primary sapienzaButton"}>
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