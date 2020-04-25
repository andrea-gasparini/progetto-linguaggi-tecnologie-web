import React, {Component} from "react";
import {withCookies} from "react-cookie";

class SignUpComponent extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Hello World!</h1>;
    }
}

export default withCookies(SignUpComponent);