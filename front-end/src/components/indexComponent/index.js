import React, {Component, Fragment} from "react";
import css from "./style.css";

class IndexComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <Fragment>
                <section className={[css.test].join(" ")}>
                    Benvenuto in React!
                </section>
            </Fragment>
        )
    }
}

export default IndexComponent;
