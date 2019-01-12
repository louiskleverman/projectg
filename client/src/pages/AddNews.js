import React, { Component } from 'react';
import "../css/addNews.css";
import * as firebase from 'firebase';
import { Redirect } from "react-router-dom";


class AddNews extends Component {
    state = {
        imageSrc : null
    }
    

    submit = () =>{
        let title = document.getElementById("inputTitle").value;
        let preambul = document.getElementById("inputPreambul").value;
        let content = document.getElementById("inputContent").value;

        if(title !== "" && preambul !== "" && content !== "" && this.state.imageSrc!=null){
            document.getElementById("upload").style.display="block";
            //Retrieve session name
            let author = "Louis-Edouard Kleverman";
            var currentdate = new Date(); 
            var published = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            
            firebase.database().ref('news').once('value',(data)=>{
                let nbPosts = 0;

                if(data.toJSON()!=null)
                    nbPosts = Object.keys(data.toJSON()).length;
                
                console.log("data",nbPosts);
                //Upload image
                let task = firebase.storage().ref('news/article'+nbPosts).putString(this.state.imageSrc,'data_url')
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
                        firebase.storage().ref('news/article'+nbPosts).getDownloadURL().then((url) => {
                            //upload news article with url
                            firebase.database().ref('news/'+nbPosts).set({
                                title,
                                author,
                                published,
                                thumbnail:url,
                                content,
                                preambul
                        
                            }).then(()=>{
                                alert("Article uploaded!");
                                console.log("inserted");
                                //Change page to newsfeed
                                this.redirect();
                                
                            }).catch((error)=>{
                                console.log(error);
                            })
                          }).catch(function(error) {
        
                          });
                    })
            });   
            
        }
        else{
            alert("Please fill all fields");   
        }
    }

    redirect = () =>{
        this.props.history.push("/news");
    }

    updateImage = () =>{
        var reader = new FileReader();
        reader.onload = (e) => {
            //document.getElementById("outputImage").src =  e.target.result;
            this.setState({imageSrc:e.target.result});
            //console.log("Image",this.state.imageSrc);
        }
        if(document.getElementById("inputImage").files[0]!=null)
            reader.readAsDataURL(document.getElementById("inputImage").files[0]);
        else{
            this.setState({imageSrc:null});
        }
        
    }

    render() {
        return (
            <div className="addNews">
                <div className="container">
                    <h1>New News Article</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="file" id="inputImage" onChange={this.updateImage}/>
                            <img 
                                id="outputImage"
                                src={this.state.imageSrc}/>
                            <div id="upload">
                                <div id="progressBar">
                                    <div id="progress"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input type="text" placeholder="TITLE" name="title" id="inputTitle"/>
                            <textarea placeholder="PREAMBUL" id="inputPreambul">
                                
                            </textarea>
                            <textarea placeholder="CONTENT" id="inputContent">
                                
                            </textarea>

                            <button id="inputButton" onClick={()=>{this.submit() }}>POST</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default AddNews;