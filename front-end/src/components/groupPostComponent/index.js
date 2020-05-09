import React, {Component, Fragment} from "react";
import './style.css';

class GroupPostComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className={"post"}>
                    <div className={"post-header"}>
                        <h1>Post title</h1>
                    </div>
                    <div className={"post-body"}>
                        <p>
                            Care Studentesse, cari Studenti,
                            Per accedere ai webinar delle esercitazioni, potete farlo via Classroom o direttamente tramite questo link:
                            Google Meet: https://meet.google.com/fffffffffff
                            Saluti,
                            -- Andrea Gasparini
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }

}

export default GroupPostComponent;