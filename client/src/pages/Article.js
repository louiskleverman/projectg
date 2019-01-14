import React, { Component } from 'react';
import "../css/article.css";
// import NewsFeed from "../components/NewsFeed.js";
import * as firebase from 'firebase';
import { connect } from 'react-redux';


class Article extends Component {
    state = {
        article :{
            title:null,
            preambul:null,
            image:null,
            content:null,
            published:null,
            author:null,
            thumbnail:null
        }
            
    }

    componentDidMount (){
        //console.log("id : " , this.props.props.match.params.id);
        let id = this.props.match.params.id;
        firebase.database().ref('news/'+id).on('value',(data)=>{
            console.log("data",data.toJSON());
            let article = data.toJSON();
            this.setState({article});
        })
    }

    editArticle = () =>{
        this.props.history.push({
            pathname:"/editArticle",
            state:{article : this.state.article, id : this.props.match.params.id}
        });
    }
    

    render() {
        return (
            <div className="article">
                <div className="container article-box">
                    <div className="articleThumbnail-box">
                        <img id="articleThumbnail" src={this.state.article.thumbnail} alt="article thumbnail"/>
                    </div>
                    <div className="article-box-info">
                    {
                        this.props.login.username === this.state.article.author ?
                            <div id="editArticle" onClick={()=>{this.editArticle()}}>Edit</div>
                        : ""
                    }
                        
                        <h1 id="articleTitle">{this.state.article.title}</h1>
                        <p id="articleInfo"><span id="articleAuthor">By : {this.state.article.author}</span> | <span id="articlePublished">published : {this.state.article.published}</span></p>
                        <p id="articlePreambul">{this.state.article.preambul}</p>
                        <p id="articleContent" dangerouslySetInnerHTML={{__html: this.state.article.content}}></p>
                    </div>
                </div>
                
            </div>
        );
    }


}


const mapStateToProps = state =>({
    login: state.login.login
});

export default connect(mapStateToProps)(Article);