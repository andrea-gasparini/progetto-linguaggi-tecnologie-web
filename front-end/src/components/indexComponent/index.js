import React, {Component, Fragment} from "react";
import "./style.css";
import {connect} from "react-redux";
import {setErrorLogin, setPassword, setUsername} from "../../redux/actions/login";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => ({...state.loginReducer});

class IndexComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    signIn = (e) => {
        e.preventDefault();
        let {username, password, dispatch} = this.props;
        dispatch(setErrorLogin({usernameHasError: false, passwordHasError: false})); // resetto i dati a false.dispatch(setErrorLogin({usernameHasError: false, passwordHasError: false})); // resetto i dati a false.

        // questo ovviamente non viene praticamente mai fatto, ci sono prima i check da fare obv.
        dispatch(setErrorLogin({usernameHasError: true, passwordHasError: true, message: "Compila entrambi i campi"})); // test errore
    };

    render() {
        let {dispatch, username, password, passwordHasError, usernameHasError, messageLoginError} = this.props;
        return(
            <Fragment>
                <section className={"d-flex flex-column justify-content-center align-items-center align-self-center h-100"}>
                    <div className={"d-flex loginBox p-4 flex-column"}>
                        <div className={"d-flex justify-content-center"}>
                            <div className={"d-flex logo align-self-center"} />
                            <div className={"d-flex align-self-center text-muted titleLogin"}>
                                Classroom
                            </div>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <div className={"d-flex mt-4 signInText"}>
                                Accedi
                            </div>
                        </div>
                        <div className={"d-flex flex-column"}>
                            <form ref={(ref) => this.loginForm = ref} method={"post"} className={"col mt-4"}>
                                <div className={"form-group"}>
                                    <input onChange={(e) => dispatch(setUsername(e.target.value))} value={username} required autoComplete={"off"} type={"email"} className={["form-control", usernameHasError ? "is-invalid" : ""].join(" ")} aria-describedby={"emailHelp"} placeholder={"Indirizzo email"} />
                                    {!usernameHasError &&
                                        <small id={"emailHelp"} className={"form-text text-muted"}>Inserisci l'indirizzo
                                            email con cui ti sei registrato.</small>
                                    }

                                    {usernameHasError &&
                                        <div className={"invalid-feedback"}>
                                            {messageLoginError}
                                        </div>
                                    }
                                </div>

                                <div className={"form-group"}>
                                    <input onChange={(e) => dispatch(setPassword(e.target.value))} value={password} required autoComplete={"off"} type={"password"} className={["form-control", passwordHasError ? "is-invalid" : ""].join(" ")} aria-describedby={"passwordHelp"} placeholder={"Password"} />
                                    {!passwordHasError &&
                                        <small id={"passwordHelp"} className={"form-text text-muted"}>Inserisci la password
                                            associata al tuo account.</small>
                                    }

                                    {passwordHasError &&
                                    <div className={"invalid-feedback"}>
                                        {messageLoginError}
                                    </div>
                                    }
                                </div>

                                <div className={"d-flex mt-3 justify-content-between"}>
                                    <div className={"d-flex align-items-center createAccount"}>
                                        <Link to={"/register"} className={"noDecoration"}>Crea un account</Link>
                                    </div>

                                    <div>
                                        <button disabled={username.length <= 0 && password.length <= 0} onClick={(e) => this.signIn(e)} className={"btn btn-primary"}>Accedi</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={"d-flex justify-content-center text-muted mt-5 text-center"}>
                            Sviluppato da Edoardo Di Paolo e Andrea Gasparini.
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(IndexComponent);
