import React, {Component, Fragment} from 'react';
import './style.css';

class FooterComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {left} = this.props;

        return (
            <Fragment>
                <footer className={["text-muted", left ? "left-footer" : "center-footer"].join(" ")}>
                    {!left &&
                        <div>Progetto sviluppato per il corso di Linguaggi e Tecnologie per il Web.</div>
                    }
                    <div>
                        &copy; 2020&nbsp;
                        <a href={"https://www.linkedin.com/in/andreagasparini1/"} target={"_blank"}>Andrea{!left && " Gasparini"}</a>
                        &nbsp;&&nbsp;
                        <a href={"https://www.linkedin.com/in/ed0ardo/"} target={"_blank"}>Edoardo{!left && " Di Paolo"}</a>
                        .
                    </div>
                    <div>
                        Codice sorgente disponibile su&nbsp;
                        <a href={"https://github.com/andrea-gasparini/progetto-linguaggi-tecnologie-web/"} target={"_blank"}>GitHub</a>
                        .
                    </div>
                </footer>
            </Fragment>
        );
    }
}

export default FooterComponent;