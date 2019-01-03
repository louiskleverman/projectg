import React, { Component } from 'react';
import "../css/news.css";
import NewsFeed from "../components/NewsFeed.js"
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';


class News extends Component {

    render() {
        return (
            <div className="news">
                <div className="container news-container">
                    {
                        this.props.login.admin === true ?
                        <div className="addNews"><NavLink to="/addNews">ADD NEWS</NavLink></div>
                        : ""
                    }
                    <h1>News</h1>
                    <p className="subtitle">Let's geeeet... RIGHT INTO THE NEEEWS!</p>
                    <NewsFeed {...this.props} nbPosts={4} pagination={true}/>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state =>({
    login: state.login.login
});

export default connect(mapStateToProps,null)(News);