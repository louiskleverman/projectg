import React, { Component } from 'react';
import "../css/newsFeed.css";
import * as firebase from 'firebase';
import { NavLink } from "react-router-dom";

class NewsFeed extends Component {
    state = {
        //Loadable : a boolean to show or not show additional news on click
        loadable:false,
        //the number of posts shown
        nbPosts:2,
        posts:[]
    }

    componentDidMount(){

        if(this.props.nbPosts!=null){

            this.setState({nbPosts:this.props.nbPosts});
            console.log("nbposts",this.state.nbPosts);
            
        }

        firebase.database().ref('news').on('value', (data) => {
            console.log("firbase res",data.toJSON())
            let json = data.toJSON();
            let posts = []
            let j = 0;
            let nbPosts = 0;
            if(data.toJSON()!=null)
                nbPosts = Object.keys(data.toJSON()).length;
                
            for(let i = nbPosts-1 ; i >= 0 && j < this.state.nbPosts ; i--){
                json[i].id = i;
                posts.push(json[i]);
                //console.log("json item",json[i]);
                j++;
            }
            console.log("posts",posts);
            this.setState({posts});
        })

        //this.refreshNews();
    }

    render() {
        return (
            <div className="newsFeed"> 
                <div className="container">
                    <div className="row">
                    {
                        this.state.posts.map((article)=>(
                            <div className="col-md-6" key={article.id}>
                                <NavLink to={"/article/"+article.id}>
                                    <div className="post">
                                        <div className="img" style={{backgroundImage : "url("+article.thumbnail+")"}}>
                                        </div>
                                        <div className="article-info">
                                            <div className="id">{"#"+article.id}</div>
                                            <h2>{article.title}</h2>
                                            <p>{article.preambul}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }




    refreshNews = () =>{
        /*
        fetch('news.json')
        .then((res) => res.json())
        .then((json) => {
            let posts = []
            let j = 0;
            for(let i = json.length-1 ; i >= 0 && j < this.state.nbPosts ; i--){
                posts.push(json[i]);
                console.log(json[i]);
                j++;
            }
            console.log("posts",posts);
            this.setState({posts});
        })
        */
    }
}

export default NewsFeed;