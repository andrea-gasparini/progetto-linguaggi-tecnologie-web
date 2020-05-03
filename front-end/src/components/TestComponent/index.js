import React, {Component} from "react";
import axios from "axios";
import {withCookies} from "react-cookie";
import {API_SERVER_URL} from "../../globalConstants";

class TestComponent extends Component {

    testUpload = async (e) => {
        e.preventDefault();
        let {cookies} = this.props;
        let {file} = this.state;
        const formData = new FormData();
        formData.append("file", file, file.name);
        return axios.post(`${API_SERVER_URL}/changeProfilePicture`, formData, {
            headers: {
                "Authorization": `Bearer ${cookies.cookies.token}`,
            }
        }).then((res) => {

        }).catch((err) => {

        });
    };

    render() {
        return(
            <div>
                <input type={"file"} onChange={(e) => this.setState({file: e.target.files[0]})} /><br></br>
                <button onClick={(e) => this.testUpload(e)}>invia</button>
            </div>
        )
    }

}


export default withCookies(TestComponent);
