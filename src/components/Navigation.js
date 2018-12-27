import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "../css/navigation.css";

class Navigation extends Component {

    render() {
        return (
            <div className="navigation">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/classes">Classes</NavLink>
                <NavLink to="/news">News</NavLink>
            </div>
        );
    }
}

export default Navigation;