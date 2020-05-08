import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
import {validateToken} from "../../redux/actions/login";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";


class GroupHomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {dispatch, cookies, history} = this.props;
        dispatch(validateToken(cookies, history, false, '/group'));
    }

    render() {
        let {history} = this.props;

        return (
          <Fragment>
              <HeaderComponent history={history} />
          </Fragment>
        );
    }

}

export default withCookies(connect()(GroupHomeComponent));