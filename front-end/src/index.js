import React from "react";
import ReactDOM from "react-dom";
import IndexComponent from "./components/indexComponent";
import { Provider } from "react-redux";
import store from "./redux/store";
import {CookiesProvider} from "react-cookie";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css';
import SignUpComponent from "./components/signUpComponent";
import HomeComponent from "./components/homeComponent";
import TestComponent from "./components/TestComponent";
import GroupHomeComponent from "./components/groupHomeComponent";
import CreatePostComponent from "./components/createPostComponent";

const routing = (
    <Provider store={store}>
        <CookiesProvider>
            <Router>
                <Switch>
                    <Route exact path={"/"} component={IndexComponent} />
                    <Route path={"/signup"} component={SignUpComponent} />
                    <Route path={"/home"} component={HomeComponent} />
                    <Route path={"/test"} component={TestComponent} />
                    <Route path={"/group/:id"} component={GroupHomeComponent} />
                    <Route path={"/testpost"} component={CreatePostComponent} />
                </Switch>
            </Router>
        </CookiesProvider>
    </Provider>
);

ReactDOM.render(routing, document.getElementById("react-root"));
