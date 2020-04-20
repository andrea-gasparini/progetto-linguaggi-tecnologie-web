import React from "react";
import ReactDOM from "react-dom";
import IndexComponent from "./components/indexComponent";
import { Provider } from "react-redux";
import store from "./redux/store";
import {CookiesProvider} from "react-cookie";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
    <Provider store={store}>
        <CookiesProvider>
            <Router>
                <Switch>
                    <Route exact path={"/"} component={IndexComponent} />
                </Switch>
            </Router>
        </CookiesProvider>
    </Provider>
);

ReactDOM.render(routing, document.getElementById("react-root"));
