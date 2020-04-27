import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import './style.css';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <HeaderComponent />
                <section className={"d-flex justify-content-center"}>
                    <div className={"d-flex homeContainerGroups flex-column"}>
                        <div className={"myGroupsTitle text-muted"}>
                            I miei gruppi (5)
                        </div>

                        <div className={"d-flex flex-row flex-wrap groupsList"}>

                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default HomeComponent;
