import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import './style.css';
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {API_SERVER_URL} from "../../globalConstants";
import {FilePlus} from "react-feather";

const mapStateToProps = (state) => ({...state.userReducer});


class CreatePostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWriting: false,
            postText: '',
            postFiles: []
        }
    }

    componentDidMount() {
        let {dispatch, cookies, history, location} = this.props;
        dispatch(validateToken(cookies, history, false, '/testpost')); // test per la pagina
    }

    trySendPost = (e) => {
        e.preventDefault();
    };

    handleChangeTextareaPost = (e) => {
        e.target.style.height = "86px";
        e.target.style.height = e.target.scrollHeight + "px";
        this.setState({postText: e.target.value});
    };

    render() {
        let {userData} = this.props;
        let {isWriting, postText, postFiles} = this.state;
        return (
            <Fragment>
                <div onClick={() => this.setState({isWriting: true})} className={["d-flex createPostContainer mt-5 ml-5 p-4", !isWriting ? "cursoredPostContainer" : ""].join(" ")}>
                    {typeof userData !== "undefined" &&
                    <div className={["d-flex w-100", !isWriting ? "align-items-center" : ""].join(" ")}>
                        {!isWriting &&
                        <Fragment>
                            <div className={"userProfilePictureImageCreatePost"}
                                 style={{backgroundImage: `url("${API_SERVER_URL}/uploads/profilePictures/${userData.viewer.picture}")`}}/>
                            <div className={"textPost ml-3"}>
                                Condividi qualcosa con il corso...
                            </div>
                        </Fragment>
                        }

                        {isWriting &&
                            <Fragment>
                                <form method={"post"} className={"d-flex flex-column"} onSubmit={(e) => this.trySendPost(e)} style={{width: "100%"}}>
                                    <div className={"form-group"}>
                                        <textarea onChange={(e) => this.handleChangeTextareaPost(e)} className={"form-control w-100 textareaPostContainer"} rows={3} placeholder={"Condividi qualcosa con il corso..."}></textarea>
                                    </div>

                                    <div className={"d-flex createPostActions justify-content-between align-items-center"}>
                                        <div>
                                            <button className={"btn d-flex align-items-center uploadFileButton colored"}>
                                                <FilePlus color={"#822433"} size={20} style={{marginRight: "5px"}} />
                                                Allega file
                                            </button>
                                            <input type={"file"} style={{display: "none"}} /> {/* bottone hidden che viene triggherato al click del button. */}
                                        </div>
                                        <div className={"d-flex"}>
                                            <button className={"btn btn-light mr-2"}>Annulla</button>
                                            <button disabled={postText.length <= 0} className={"btn btn-primary sapienzaButton"}>Pubblica</button>
                                        </div>
                                    </div>
                                </form>
                            </Fragment>
                        }

                    </div>
                    }
                </div>
            </Fragment>
        );
    }

}

export default withCookies(connect(mapStateToProps)(CreatePostComponent));
