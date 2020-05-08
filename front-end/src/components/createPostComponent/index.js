import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import './style.css';
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {API_SERVER_URL} from "../../globalConstants";
import {FilePlus} from "react-feather";
import FilePreviewComponent from "../filePreviewComponent";
import axios from "axios";

const mapStateToProps = (state) => ({...state.userReducer});


class CreatePostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWriting: false,
            postText: '',
            postFiles: [],
            showError: false,
            errorText: ''
        }
    }

    componentDidMount() {
        let {dispatch, cookies, history, location} = this.props;
        dispatch(validateToken(cookies, history, false, '/testpost')); // test per la pagina
    }

    trySendPost = (e) => {
        this.setState({showError: false});
        e.preventDefault();
        let {cookies} = this.props;
        let {postFiles, postText} = this.state;
        let postFilesData = new FormData();
        postFiles.map((value) => {
            postFilesData.append("files[]", value);
        });

        postFilesData.append("postText", postText);
        postFilesData.append("groupId", 11); // da cambiare il gruppo id dinamicamente.
        axios.post(`${API_SERVER_URL}/createPost`, postFilesData, {
            headers: {
                "Authorization": `Bearer ${cookies.cookies.token}`
            }
        }).then((res) => {
            let {status, data, message} = res.data;
            if(status) {
                this.inputFile.value = '';
                this.setState({postFiles: [], postText: ''});
            } else {
                this.setState({showError: true, errorText: message})
            }
        }); // test payload data
    };

    handleChangeTextareaPost = (e) => {
        e.target.style.height = "86px";
        e.target.style.height = e.target.scrollHeight + "px";
        this.setState({postText: e.target.value});
    };

    clickInputFile = () => {
        this.inputFile.click();
    };

    changeInputFile = (e) => {
        let files = e.target.files;
        let output = this.state.postFiles;
        for(let i = 0; i <= files.length - 1; i++) {
            if(output.filter(x => x.lastModified === files[i].lastModified && files[i].name === x.name).length <= 0) // check file duplicati
                output.push(files[i]);
        }
        this.setState({postFiles: output});
    };

    removeFile = (file) => {
        let postFiles = this.state.postFiles;
        postFiles = postFiles.filter(x => x.lastModified !== file.lastModified && file.name !== x.name); // rimuovo file
        this.setState({postFiles});
        if(postFiles.length <= 0)
            this.inputFile.value = '';
    };

    hideWriting = (e) => {
        e.preventDefault();
        this.setState({isWriting: false});
    };

    render() {
        let {userData} = this.props;
        let {isWriting, postText, postFiles, showError, errorText} = this.state;
        return (
            <Fragment>
                <div onClick={() => {!isWriting && this.setState({isWriting: true})}} className={["d-flex createPostContainer p-4", !isWriting ? "cursoredPostContainer" : ""].join(" ")}>
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
                                    {showError &&
                                        <div className={"alert alert-danger"}>
                                            <b>{errorText}</b>
                                        </div>
                                    }
                                    <div className={"form-group"}>
                                        <textarea value={postText} onChange={(e) => this.handleChangeTextareaPost(e)} className={"form-control w-100 textareaPostContainer"} rows={3} placeholder={"Condividi qualcosa con il corso..."}>{postText}</textarea>
                                    </div>

                                    <div>
                                        {postFiles.map((value, index) => (
                                            <FilePreviewComponent key={index} file={value} removeFile={this.removeFile} />
                                        ))}
                                    </div>

                                    <div className={"d-flex createPostActions justify-content-between align-items-center"}>
                                        <div>
                                            <button type={"button"} onClick={() => this.clickInputFile()} className={"btn d-flex align-items-center uploadFileButton colored"}>
                                                <FilePlus color={"#822433"} size={20} style={{marginRight: "5px"}} />
                                                Allega file
                                            </button>
                                            <input onChange={(e) => this.changeInputFile(e)} multiple={true} ref={(ref) => {this.inputFile = ref}} type={"file"} style={{display: "none"}} /> {/* bottone hidden che viene triggherato al click del button. */}
                                        </div>
                                        <div className={"d-flex"}>
                                            <button type={"button"} onClick={(e) => this.hideWriting(e)} className={"btn btn-light mr-2"}>Annulla</button>
                                            <button type={"submit"} disabled={postText.length <= 0} className={"btn btn-primary sapienzaButton"}>Pubblica</button>
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
