import React from "react";
import ReactDOM from "react-dom";
import IndexComponent from "./components/indexComponent";
import { Provider } from "react-redux";
import store from "./redux/store";
import {CookiesProvider} from "react-cookie";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css';
import HomeComponent from "./components/homeComponent";

const routing = (
    <Provider store={store}>
        <CookiesProvider>
            <Router>
                <Switch>
                    <Route exact path={"/"} component={IndexComponent} />
                    <Route path={"/home"} component={HomeComponent} />
                </Switch>
            </Router>
        </CookiesProvider>
    </Provider>
);

ReactDOM.render(routing, document.getElementById("react-root"));
