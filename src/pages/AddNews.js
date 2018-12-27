import React, { Component } from 'react';
import "../css/addNews.css";
import * as firebase from 'firebase';


class AddNews extends Component {
    state = {
        imageSrc : null
    }

    submit = () =>{
        let title = document.getElementById("inputTitle").value;
        let preambul = document.getElementById("inputPreambul").value;
        let content = document.getElementById("inputContent").value;

        if(title !== "" && preambul !== "" && content !== "" && this.state.imageSrc!=null){
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
                firebase.database().ref('news/'+nbPosts).set({
                    title,
                    author,
                    published,
                    thumbnail:"https://firebasestorage.googleapis.com/v0/b/project-g-b3aae.appspot.com/o/news%2Fbackground1.jpg?alt=media&token=9fb729d5-3c16-4a1d-9401-fe40bb0e013e",
                    content,
                    preambul
            
                }).then(()=>{
                    console.log("inserted")
                    firebase.storage().ref('news/article'+nbPosts).putString(this.state.imageSrc,'data_url')
                    .then(()=>{
                        console.log("Image uploaded!")
                    })
                }).catch((error)=>{
                    console.log(error);
                })
            });   
            
        }
        else{
            alert("Please fill all fields");   
        }
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