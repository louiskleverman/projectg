import React, { Component } from 'react';
import "../css/news.css";
import NewsFeed from "../components/NewsFeed.js"
import { NavLink } from "react-router-dom";


class News extends Component {
    state = {
    }

    render() {
        return (
            <div className="news">
                <div className="container news-container">
                    <div className="addNews"><NavLink to="/addNews">ADD NEWS</NavLink></div>
                    <h1>News</h1>
                    <p className="subtitle">Let's geeeet... RIGHT INTO THE NEEEWS!</p>
                    <NewsFeed {...this.props} nbPosts={4} pagination={true}/>
                </div>

            </div>
        );
    }

}

export default News;