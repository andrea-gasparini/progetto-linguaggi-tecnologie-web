import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import './style.css';
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {API_SERVER_URL} from "../../globalConstants";

const mapStateToProps = (state) => ({...state.userReducer});


class CreatePostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWriting: false
        }
    }

    componentDidMount() {
        let {dispatch, cookies, history, location} = this.props;
        dispatch(validateToken(cookies, history, false, '/testpost')); // test per la pagina
    }

    trySendPost = (e) => {
        e.preventDefault();
    };

    autoHeightArea = (e) => {
        e.target.style.height = "86px";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    render() {
        let {userData} = this.props;
        let {isWriting} = this.state;
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
                                <form method={"post"} onSubmit={(e) => this.trySendPost(e)} style={{width: "100%"}}>
                                    <div className={"form-group"}>
                                        <textarea onChange={(e) => this.autoHeightArea(e)} className={"form-control w-100 textareaPostContainer"} rows={3} placeholder={"Condividi qualcosa con il corso..."}></textarea>
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
