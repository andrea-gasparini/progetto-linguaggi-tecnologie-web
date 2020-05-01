import React, {Component, Fragment} from "react";
import {withCookies} from "react-cookie";
import "./style.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    setSignUpRealname,
    setSignUpUsername,
    setSignUpEmail,
    setSignUpPassword,
    setSignUpConfirmPassword,
    tryAuthSignUp, setErrorSignUp
} from "../../redux/actions/signup";
import {validateToken} from "../../redux/actions/login";

const mapStateToProps = (state) => ({...state.signUpReducer});

class SignUpComponent extends Component
{
    constructor(props) {
        super(props);

        this.state = { showSignUp: false } // il login viene mostrato solo se non c'è un token di accesso
    }

    async componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        if(typeof cookies.cookies.token === "string") // se c'è un token di accesso, proviamo a convalidarlo.
            await dispatch(validateToken(cookies, history));
        else if(typeof cookies.cookies.token === "undefined")
            this.setState({showSignUp: true}); // se non c'è un token di accesso mostriamo la pagina
    }

    credentialsLengthCheck(credentials) {
        return credentials.filter(c => typeof c === "undefined" || c.length <= 0).length > 0;
    }

    signUp(e) {
        e.preventDefault();
        let { signUpRealname, signUpUsername, signUpEmail, signUpPassword, signUpConfirmPassword,
            dispatch, history, cookies } = this.props;

        // Reset stati errore
        dispatch(setErrorSignUp({ signUpRealnameHasError: false, signUpUsernameHasError: false,
            signUpEmailHasError: false, signUpPasswordHasError: false, signUpConfirmPasswordHasError: false }));

        dispatch(tryAuthSignUp({signUpRealname, signUpUsername, signUpEmail, signUpPassword,
            signUpConfirmPassword}, cookies, history));
    }

    render() {
        let { signUpRealname, signUpUsername, signUpEmail, signUpPassword, signUpConfirmPassword, signUpRealnameHasError,
            signUpUsernameHasError, signUpEmailHasError, signUpPasswordHasError, signUpConfirmPasswordHasError,
            messageSignUpError, dispatch } = this.props;
        let credentials = [signUpRealname, signUpUsername, signUpEmail, signUpPassword, signUpConfirmPassword];

        if (this.state.showSignUp)
            return (
                <Fragment>
                    <section
                        className={"d-flex flex-column justify-content-center align-items-center align-self-center h-100"}>
                        <div className={"d-flex registerBox p-4 flex-column"}>
                            <div className={"d-flex justify-content-center noselectText"}>
                                <div className={"d-flex logo align-self-center"}/>
                                <div className={"d-flex align-self-center text-muted titleLogin"}>
                                    Classroom
                                </div>
                            </div>
                            <div className={"d-flex justify-content-center"}>
                                <div className={"d-flex mt-4 signInText"}>
                                    Crea un nuovo account
                                </div>
                            </div>
                            <div className={"d-flex flex-column"}>
                                <form ref={(ref) => this.signUpForm = ref} onSubmit={e => this.signUp(e)} method={"post"} className={"col mt-4"}>
                                    <div className={"d-flex flex-row justify-content-between"}>
                                        <div className={"form-group"}>
                                            <input onChange={(e) => dispatch(setSignUpRealname(e.target.value))}
                                               value={signUpRealname}
                                               required autoComplete={"off"} type={"text"}
                                               className={["form-control", signUpRealnameHasError ? "is-invalid" : ""].join(" ")}
                                               placeholder={"Nome e cognome"}/>
                                            {! signUpRealnameHasError &&
                                                <small id={"realnameHelp"} className={"form-text text-muted"}>
                                                    Inserisci il tuo nome e il tuo cognome.
                                                </small>
                                            }

                                            {signUpRealnameHasError &&
                                                <div className={"invalid-feedback"}>
                                                    {messageSignUpError}
                                                </div>
                                            }
                                        </div>

                                        <div className={"form-group"}>
                                            <input onChange={(e) => dispatch(setSignUpUsername(e.target.value))}
                                               value={signUpUsername}
                                               required autoComplete={"off"} type={"text"}
                                               className={["form-control", signUpUsernameHasError ? "is-invalid" : ""].join(" ")}
                                               placeholder={"Username"}/>
                                            {! signUpUsernameHasError &&
                                                <small id={"usernameHelp"} className={"form-text text-muted"}>
                                                    Inserisci un username per il tuo account.
                                                </small>
                                            }

                                            {signUpUsernameHasError &&
                                                <div className={"invalid-feedback"}>
                                                    {messageSignUpError}
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className={"form-group"}>
                                        <input onChange={(e) => dispatch(setSignUpEmail(e.target.value))}
                                            value={signUpEmail}
                                            required autoComplete={"off"} type={"email"}
                                            className={["form-control", signUpEmailHasError ? "is-invalid" : ""].join(" ")}
                                            aria-describedby={"emailHelp"} placeholder={"Indirizzo email"}/>
                                        {! signUpEmailHasError &&
                                            <small id={"emailHelp"} className={"form-text text-muted"}>
                                                Inserisci il tuo indirizzo email.
                                            </small>
                                        }

                                        {signUpEmailHasError &&
                                            <div className={"invalid-feedback"}>
                                                {messageSignUpError}
                                            </div>
                                        }
                                    </div>


                                    <div className={"form-group"}>
                                        <div className={"d-flex flex-row justify-content-between"}>
                                            <input onChange={(e) => dispatch(setSignUpPassword(e.target.value))}
                                               value={signUpPassword}
                                               required autoComplete={"off"} type={"password"}
                                               className={["form-control mr-4", signUpPasswordHasError ? "is-invalid" : ""].join(" ")}
                                               aria-describedby={"passwordHelp"} placeholder={"Password"}/>

                                           <input onChange={(e) => dispatch(setSignUpConfirmPassword(e.target.value))}
                                               value={signUpConfirmPassword}
                                               required autoComplete={"off"} type={"password"}
                                               className={["form-control", signUpConfirmPasswordHasError ? "is-invalid" : ""].join(" ")}
                                               aria-describedby={"confirmPasswordHelp"} placeholder={"Conferma password"}/>
                                        </div>
                                            {!(signUpPasswordHasError || signUpConfirmPasswordHasError) &&
                                                <small id={"passwordHelp"} className={"form-text text-muted"}>
                                                    Inserisci una password di almeno 8 caratteri per il tuo account.
                                                </small>
                                            }

                                            {(signUpPasswordHasError || signUpConfirmPasswordHasError) &&
                                                <div className={"invalid-feedback"} style={{display: "block"}}>
                                                    {messageSignUpError}
                                                </div>
                                            }
                                    </div>

                                    <div className={"d-flex mt-3 justify-content-between"}>
                                        <div className={"d-flex align-items-center createAccount"}>
                                            <Link to={"/"} className={"noDecoration"}>Accedi</Link>
                                        </div>

                                        <div>
                                            <button
                                                disabled={this.credentialsLengthCheck(credentials)}
                                                className={"btn btn-primary sapienzaButton"}
                                                type={"submit"}>
                                                Registrati
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </Fragment>
            );
        else
            return <Fragment>{/* loading */}</Fragment>
    }
}

export default withCookies(connect(mapStateToProps)(SignUpComponent));
