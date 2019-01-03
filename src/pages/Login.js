import React, { Component } from 'react';
import "../css/login.css"
import { connect } from 'react-redux';
import { login } from '../actions/loginActions'
import { SHA256 } from 'crypto-js';
import * as firebase from 'firebase';

class Login extends Component {

    render() {
        // var x = SHA256("pdfx");
        // var y = SHA256("pdffx");
        // var equals = true;
        // for(var i = 0 ; i < x.words.length ; i++ ){
        //     if(x.words[i] != y.words[i]){
        //         equals = false;
        //     }
        // }

        return (
            <div className="container" id="loginPage">
                <div className="row">
                    <div className="col-md-6" id="login">
                        <h2>Login</h2>
                        <p>Log in here with either your email or your username.</p>
                        <input id="loginEmail" type="email" placeholder="Email or Username"/>
                        <input id="loginPassword" type="password" placeholder="Your password"/>
                        <button onClick={()=>this.loggingIn()}>Login</button>
                    </div>
                    <div className="col-md-6" id="signup">
                        <h2>Sign up</h2>
                        <p>Sign up to get access to the game and the websites functionalities.</p>
                        <input id="signupUsername" type="text" placeholder="Username" required/>
                        <input id="signupEmail" type="email" placeholder="Email" required/>
                        <input id="signupPassword" type="password" placeholder="Your password" required/>
                        <input id="signupConfirmPassword" type="password" placeholder="Confirm password" required/>
                        <button onClick={()=>{this.signup()}}>sign up</button>
                    </div>
                </div>
            </div>
        );
    }

    loggingIn = () =>{
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        firebase.database().ref('users').once('value',(data)=>{
            let json = data.toJSON();
            console.log(json);
            for(var i = 0 ; i < Object.keys(json).length ; i++){
                if(email == json[i].email || email == json[i].username){

                    var y = json[i].password;
                    var x = SHA256(password);
                    let equals = true;
                    for(var j = 0 ; j < x.words.length ; j++ ){
                        if(x.words[j] != y.words[j]){
                            equals = false;
                        }
                    }

                    if(equals === true){
                        var login = {
                            username : json[i].username,
                            email : json[i].email,
                            admin : json[i].admin
                        }
                        this.props.login(login);
                        alert("You have succesfully logged in !");
                        this.props.history.push("/");
                    }else{
                        alert("wrong password");
                    }
                }
            }


        }).catch((error)=>{
            console.log(error);
        })
    }

    signup = () =>{
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var confirmPassword = document.getElementById("signupConfirmPassword").value;

        if(username != null && email != null && password != null && password == confirmPassword){
            firebase.database().ref('users').once('value',(data)=>{
                let nbUsers = 0;

                if(data.toJSON()!=null)
                    nbUsers = Object.keys(data.toJSON()).length;

                firebase.database().ref('users/'+nbUsers).set({
                    username : username,
                    email : email,
                    password : SHA256(password),
                    admin : false,
                }).then(()=>{
                    var user = {
                        username : username,
                        email : email,
                        admin : false,
                    }
                    
                    this.props.login(user);
                    alert("You have succesfully created your account!");
                    this.props.history.push("/");
                    
                }).catch((error)=>{
                    console.log(error);
                })
            }).catch((error)=>{
                console.log(error);
            })

        }
    }
}

const mapStateToProps = state =>({
    login: state.login.login
});

export default connect(mapStateToProps, { login })(Login);