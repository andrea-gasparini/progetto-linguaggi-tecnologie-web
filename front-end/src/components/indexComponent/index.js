import React, {Component, Fragment} from "react";
import "./style.css";
import {connect} from "react-redux";
import {setErrorLogin, setPassword, setUsername, tryAuthLogin, validateToken} from "../../redux/actions/login";
import {Link} from "react-router-dom";
import {withCookies} from "react-cookie";

const mapStateToProps = (state) => ({...state.loginReducer});

class IndexComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogin: false // inizialmente non mostriamo il login (vedi componentdidmount).
        }
    }

    async componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        if(typeof cookies.cookies.token === "string") // se abbiamo un token di accesso, proviamo a convalidarlo.
            await dispatch(validateToken(cookies, history));

        if(typeof cookies.cookies.token === "undefined")
            this.setState({showLogin: true}); // se non abbiamo il token, o comunque non siamo stati redirectati mostriamo il login.
    }

    signIn = (e) => {
        e.preventDefault();
        let {username, password, dispatch, usernameHasError, passwordHasError, cookies, history} = this.props;
        if(usernameHasError || passwordHasError)
            dispatch(setErrorLogin({usernameHasError: false, passwordHasError: false})); // resetto i dati a false


        dispatch(tryAuthLogin(username, password, cookies, history));
    };

    render() {
        let {showLogin} = this.state;
        let {dispatch, username, password, passwordHasError, usernameHasError, messageLoginError} = this.props;
        if(showLogin) {
            return (
                <Fragment>
                    <section
                        className={"d-flex flex-column justify-content-center align-items-center align-self-center h-100"}>
                        <div className={"d-flex loginBox p-4 flex-column"}>
                            <div className={"d-flex justify-content-center"}>
                                <div className={"d-flex logo align-self-center"}/>
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
                                        <input onChange={(e) => dispatch(setUsername(e.target.value))} value={username}
                                               required autoComplete={"off"} type={"email"}
                                               className={["form-control", usernameHasError ? "is-invalid" : ""].join(" ")}
                                               aria-describedby={"emailHelp"} placeholder={"Indirizzo email"}/>
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
                                        <input onChange={(e) => dispatch(setPassword(e.target.value))} value={password}
                                               required autoComplete={"off"} type={"password"}
                                               className={["form-control", passwordHasError ? "is-invalid" : ""].join(" ")}
                                               aria-describedby={"passwordHelp"} placeholder={"Password"}/>
                                        {!passwordHasError &&
                                        <small id={"passwordHelp"} className={"form-text text-muted"}>Inserisci la
                                            password
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
                                            <button disabled={username.length <= 0 || password.length <= 0}
                                                    onSubmit={(e) => this.signIn(e)}
                                                    className={"btn btn-primary sapienzaButton"}>Accedi
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )
        } else {
            return(
                <Fragment>{/* loading */}</Fragment>
            )
        }

    }
}

export default withCookies(connect(mapStateToProps)(IndexComponent));
