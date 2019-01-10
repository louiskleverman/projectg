import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import "../css/navigation.css";
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';

class Navigation extends Component {

    render() {
        return (
            <div className="navigation">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/classes">Classes</NavLink>
                <NavLink to="/news">News</NavLink>
                {
                    this.props.login.email == null ?
                    <NavLink id="loginNav" to="/login">Login / Signup</NavLink>
                    :
                    <div id="loggedin">{this.props.login.username}  <span onClick={()=>this.loggingOut()}>sign out</span></div>
                }
            </div>
        );
    }

    loggingOut = () => {
        this.props.logout();
    }
}

const mapStateToProps = state =>({
    login: state.login.login
});

export default withRouter(connect(mapStateToProps,{ logout })(Navigation));