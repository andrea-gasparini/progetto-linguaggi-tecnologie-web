import './style.css';
import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {setPassword, setUsername, validateToken} from "../../redux/actions/login";
import {API_SERVER_URL} from "../../globalConstants";
import {Camera, Mail, Key} from "react-feather";
import {Link} from "react-router-dom";
import {resetDataSignup, setErrorSignUp, setSignUpConfirmPassword, setSignUpPassword} from "../../redux/actions/signup";
import FooterComponent from "../footerComponent";
import axios from "axios";
import qs from "querystring";
import {addNewComment} from "../../redux/actions/group";
import {setUserData} from "../../redux/actions/user";

const mapStateToProps = (state) => ({...state.userReducer});

class SettingsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profilePicHover: false,
            emailFormIsVisible: false,
            passwordFormIsVisible: false,
            newEmail: '',
            confirmNewEmail: '',
            newEmailHasError: false,
            confirmNewEmailHasError: false,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            oldPasswordHasError: false,
            newPasswordHasError: false,
            confirmNewPasswordHasError: false,
            messageEditUserError: ''
        }
    }

    componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        dispatch(validateToken(cookies, history, false, '/settings'));
    }

    togglePicHover() { this.setState({profilePicHover: !this.state.profilePicHover}); }

    toggleEmailForm() {
        let {emailFormIsVisible, passwordFormIsVisible} = this.state;

        if (passwordFormIsVisible && !emailFormIsVisible)
            this.togglePasswordForm()

        this.setState({emailFormIsVisible: !this.state.emailFormIsVisible});
    }

    togglePasswordForm() {
        let {emailFormIsVisible, passwordFormIsVisible} = this.state;

        if (emailFormIsVisible && !passwordFormIsVisible)
            this.toggleEmailForm()

        this.setState({passwordFormIsVisible: !this.state.passwordFormIsVisible});
    }

    editEmailRequest(e) {
        e.preventDefault();

        let {newEmail, confirmNewEmail} = this.state;
        let {userData, cookies, dispatch} = this.props;

        axios.post(
            `${API_SERVER_URL}/changeEmail`,
            qs.stringify({newEmail, confirmNewEmail}),
            {headers: {'Authorization': `Bearer ${cookies.cookies.token}`}}
        ).then(res => {
            if (res.data.status) {
                this.setState({newEmail: '', confirmNewEmail: '', messageEditUserError: '', emailFormIsVisible: false,
                    newEmailHasError: false, confirmNewEmailHasError: false});
                dispatch(setUserData({...userData, viewer: { ...userData.viewer, email: newEmail }}));
            }
            else {
                let {newEmailHasError, confirmNewEmailHasError} = res.data.data;
                this.setState({newEmailHasError, confirmNewEmailHasError, messageEditUserError: res.data.message});
            }
        });
    }

    editPasswordRequest(e) {
        e.preventDefault();

        let {oldPassword, newPassword, confirmNewPassword} = this.state;

        axios.post(
            `${API_SERVER_URL}/changePassword`,
            qs.stringify({oldPassword, newPassword, confirmNewPassword}),
            {headers: {'Authorization': `Bearer ${this.props.cookies.cookies.token}`}}
        ).then(res => {
            if (res.data.status) {
                this.setState({oldPassword: '', newPassword: '', confirmNewPassword: '', messageEditUserError: '',
                    passwordFormIsVisible: false, oldPasswordHasError: false, newPasswordHasError: false, confirmNewPasswordHasError: false});
            }
            else {
                let {oldPasswordHasError, newPasswordHasError, confirmNewPasswordHasError} = res.data.data;
                this.setState({oldPasswordHasError, newPasswordHasError, confirmNewPasswordHasError, messageEditUserError: res.data.message});
            }
        });
    }

    editPictureRequest(e) {
        e.preventDefault();

        this.setState({file: e.target.files[0]})

        let {cookies} = this.props;
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);
        return axios.post(`${API_SERVER_URL}/changeProfilePicture`, formData, {
            headers: { "Authorization": `Bearer ${cookies.cookies.token}` }
        });
    }

    render() {
        let {history, userData} = this.props;
        let {profilePicHover, emailFormIsVisible, passwordFormIsVisible, newEmail, confirmNewEmail, newEmailHasError,
            confirmNewEmailHasError, oldPassword, newPassword, confirmNewPassword, oldPasswordHasError,
            newPasswordHasError, confirmNewPasswordHasError, messageEditUserError} = this.state;

        return (typeof userData !== "undefined") ?
            (
                <Fragment>
                    <HeaderComponent history={history} />
                    <section className={"d-flex flex-column align-items-center justify-content-center"}>
                        <div className={"settingsContainer"}>
                            <label
                                htmlFor={"newPic"}
                                className={"profilePic"}
                                style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${userData.viewer.picture}")`}}
                                onMouseEnter={() => this.togglePicHover()}
                                onMouseLeave={() => this.togglePicHover()}>
                                {profilePicHover && <Camera size={30} />}
                            </label>
                            <input hidden id="newPic" type={"file"} onChange={(e) => this.editPictureRequest(e)} />
                            <h3 className={"mt-2"}>{userData.viewer.realname}</h3>
                            <p className={"text-muted"}>{userData.viewer.email}</p>

                            <div className={"d-flex noselectText"}>

                                <div className={"editButton"} onClick={() => this.togglePasswordForm()}>
                                    <Key size={18}/>
                                    <span>Modifica password</span>
                                </div>

                                <div className={"editButton"} onClick={() => this.toggleEmailForm()}>
                                    <Mail size={18}/>
                                    <span>Modifica email</span>
                                </div>

                            </div>

                            {emailFormIsVisible &&
                                <form onSubmit={(e) => this.editEmailRequest(e)} method={"post"} className={"w-50 mt-4"}>
                                    <div className={"form-group"}>
                                        <div className={"d-flex flex-column"}>
                                            <input onChange={(e) => {this.setState({newEmail: e.target.value})}} value={newEmail}
                                                   required autoComplete={"off"} type={"email"}
                                                   className={["mb-2 form-control", newEmailHasError ? "is-invalid" : ""].join(" ")}
                                                   aria-describedby={"emailHelp"} placeholder={"Indirizzo email"}/>

                                            <input onChange={(e) => {this.setState({confirmNewEmail: e.target.value})}} value={confirmNewEmail}
                                                   required autoComplete={"off"} type={"email"}
                                                   className={["form-control", confirmNewEmailHasError ? "is-invalid" : ""].join(" ")}
                                                   aria-describedby={"emailHelp"} placeholder={"Conferma indirizzo email"}/>
                                        </div>
                                        {!(newEmailHasError || confirmNewEmailHasError) &&
                                        <small id={"emailHelp"} className={"form-text text-muted"}>
                                            Inserisci il nuovo indirizzo email da associare al tuo account.
                                        </small>
                                        }

                                        {(newEmailHasError || confirmNewEmailHasError) &&
                                        <div className={"invalid-feedback"}>
                                            {messageEditUserError}
                                        </div>
                                        }
                                    </div>

                                    <div className={"d-flex mt-3 justify-content-end"}>
                                        <div>
                                            <button disabled={newEmail.length <= 0 || confirmNewEmail.length <= 0}
                                                    type={"submit"}
                                                    className={"btn btn-primary sapienzaButton"}>Conferma
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            }

                            {passwordFormIsVisible &&
                                <form onSubmit={(e) => this.editPasswordRequest(e)} method={"post"} className={"w-50 mt-4"}>
                                    <div className={"form-group"}>
                                        <input onChange={(e) => {this.setState({oldPassword: e.target.value})}}
                                               value={oldPassword} required autoComplete={"off"} type={"password"}
                                               className={["form-control", oldPasswordHasError ? "is-invalid" : ""].join(" ")}
                                               aria-describedby={"passwordHelp"} placeholder={"Password"}/>
                                        {!oldPasswordHasError &&
                                        <small id={"passwordHelp"} className={"form-text text-muted"}>
                                            Inserisci la password associata al tuo account.
                                        </small>
                                        }

                                        {oldPasswordHasError &&
                                        <div className={"invalid-feedback"}>
                                            {messageEditUserError}
                                        </div>
                                        }
                                    </div>

                                    <div className={"form-group"}>
                                        <div className={"d-flex flex-column"}>
                                            <input onChange={(e) => {this.setState({newPassword: e.target.value})}}
                                                   value={newPassword} required autoComplete={"off"} type={"password"}
                                                   className={["mb-2 form-control mr-4", newPasswordHasError ? "is-invalid" : ""].join(" ")}
                                                   aria-describedby={"passwordHelp"} placeholder={"Nuova password"}/>

                                            <input onChange={(e) => {this.setState({confirmNewPassword: e.target.value})}}
                                                   value={confirmNewPassword}
                                                   required autoComplete={"off"} type={"password"}
                                                   className={["form-control", confirmNewPasswordHasError ? "is-invalid" : ""].join(" ")}
                                                   aria-describedby={"confirmPasswordHelp"} placeholder={"Conferma nuova password"}/>
                                        </div>
                                        {!(newPasswordHasError || confirmNewPasswordHasError) &&
                                        <small id={"passwordHelp"} className={"form-text text-muted"}>
                                            Inserisci una nuova password di almeno 8 caratteri per il tuo account.
                                        </small>
                                        }

                                        {(newPasswordHasError || confirmNewPasswordHasError) &&
                                        <div className={"invalid-feedback"} style={{display: "block"}}>
                                            {messageEditUserError}
                                        </div>
                                        }
                                    </div>

                                    <div className={"d-flex mt-3 justify-content-end"}>
                                        <div>
                                            <button disabled={oldPassword.length <= 0 || newPassword.length <= 0 || confirmNewPassword.length <= 0}
                                                    type={"submit"}
                                                    className={"btn btn-primary sapienzaButton"}>Conferma
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                        <FooterComponent/>
                    </section>
                </Fragment>
            )
        : <Fragment />
    }

}

export default withCookies(connect(mapStateToProps)(SettingsComponent));
