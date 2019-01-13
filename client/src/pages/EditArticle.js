import React, { Component } from 'react';
import "../css/addNews.css";
import * as firebase from 'firebase';


class EditArticle extends Component {
    state = {
        article:{
            title:null,
            preambul:null,
            image:null,
            content:null,
            published:null,
            author:null,
            thumbnail:null
        },
        id:null
    }

    componentWillMount(){
        console.log("Location props",this.props.location.state)
        this.props.location.state.article.image = this.props.location.state.article.thumbnail;
        this.setState({
            article:this.props.location.state.article,
            id:this.props.location.state.id
        })
    }

    
    updateImage = () =>{
        var reader = new FileReader();
        reader.onload = (e) => {
            let article = this.state.article;
            article.image = e.target.result;
            this.setState({article});
        }
        if(document.getElementById("inputImage").files[0]!=null){
            reader.readAsDataURL(document.getElementById("inputImage").files[0]);
        }else{
            let article = this.state.article;
            article.image = article.thumbnail;
            this.setState({article});
        }
        
    }


    
    submit = () =>{
        let title = document.getElementById("inputTitle").value;
        let preambul = document.getElementById("inputPreambul").value;
        let content = document.getElementById("inputContent").value;

        if(title !== "" && preambul !== "" && content !== "" ){
            var currentdate = new Date(); 
            var updated = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

            if(document.getElementById("inputImage").files[0] !=null ){
                document.getElementById("upload").style.display="block";
                
                    
                let task = firebase.storage().ref('news/article'+this.state.id).putString(this.state.article.image,'data_url')
                task.on('state_changed',
                    (snapshot) =>{
                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                        document.getElementById("progress").style.width=percentage+"%";
                    },
                    (err) => {
                        console.log(err);
                    },
                    () => {
                        document.getElementById("progress").style.backgroundColor="rgb(81, 255, 0)";

                        //get Image URL
                        firebase.storage().ref('news/article'+this.state.id).getDownloadURL().then((url) => {
                            //upload news article with url
                            firebase.database().ref('news/'+this.state.id).set({
                                title,
                                author:this.state.article.author,
                                published:this.state.article.published,
                                thumbnail:url,
                                content,
                                preambul,
                                updated
                        
                            }).then(()=>{
                                alert("Article uploaded!");
                                console.log("inserted");
                                //Change page to newsfeed
                                this.props.history.push("/article/"+this.state.id);
                                
                            }).catch((error)=>{
                                console.log(error);
                            })
                        }).catch(function(error) {
        
                        });
                    })
                 
            }
            else{
                firebase.database().ref('news/'+this.state.id).set({
                    title,
                    author:this.state.article.author,
                    published:this.state.article.published,
                    thumbnail:this.state.article.thumbnail,
                    content,
                    preambul,
                    updated
                }).then(()=>{
                    alert("Article uploaded!");
                    console.log("inserted");
                    //Change page to newsfeed
                    this.props.history.push("/article/"+this.state.id);
                    
                }).catch((error)=>{
                    console.log(error);
                })
            }
            
            
        }
        else{
            alert("Please fill all fields");   
        }
    }

    render() {
        console.log("state",this.state)
        return (
            <div className="addNews">
                <div className="container">
                    <h1>Edit Article n°{this.state.id}</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="file" id="inputImage" onChange={this.updateImage}/>
                            <img 
                                id="outputImage"
                                src={this.state.article.image}/>
                            <div id="upload">
                                <div id="progressBar">
                                    <div id="progress"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input type="text" placeholder="TITLE" name="title" id="inputTitle" defaultValue={this.state.article.title}/>
                            <textarea placeholder="PREAMBUL" id="inputPreambul" defaultValue={this.state.article.preambul}>
                                
                            </textarea>
                            <textarea placeholder="CONTENT" id="inputContent" defaultValue={this.state.article.content}>
                                
                            </textarea>

                            <button id="inputButton" onClick={()=>{this.submit() }}>UPDATE</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default EditArticle;