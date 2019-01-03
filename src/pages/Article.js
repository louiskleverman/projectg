import React, { Component } from 'react';
import "../css/article.css";
// import NewsFeed from "../components/NewsFeed.js";
import * as firebase from 'firebase';


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
        let id = this.props.props.match.params.id;
        firebase.database().ref('news/'+id).on('value',(data)=>{
            console.log("data",data.toJSON());
            let article = data.toJSON();
            this.setState({article});
        })
    }

    render() {

        return (
            <div className="article">
                <div className="container article-box">
                    <div className="articleThumbnail-box">
                        <img id="articleThumbnail" src={this.state.article.thumbnail}/>
                    </div>
                    <div className="article-box-info">
                        <div id="editArticle" onClick={()=>{this.editArticle()}}>Edit</div>
                        <h1 id="articleTitle">{this.state.article.title}</h1>
                        <p id="articleInfo"><span id="articleAuthor">By : {this.state.article.author}</span> | <span id="articlePublished">published : {this.state.article.published}</span></p>
                        <p id="articlePreambul">{this.state.article.preambul}</p>
                        <p id="articleContent" dangerouslySetInnerHTML={{__html: this.state.article.content}}></p>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".modalTest">Large modal</button>
                    </div>
                </div>


                <div id="modal" class="modal modalTest" tabindex="-1" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }

    editArticle = () =>{
        //document.getElementById("modal").modal('show');
        //$('#modal').modal('show');  
    }

}

export default Article;