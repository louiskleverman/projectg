import React, { Component } from 'react';
import "../css/login.css"
import { connect } from 'react-redux';
import { login } from '../actions/loginActions'
import { SHA256 } from 'crypto-js';

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo';
import * as firebase from 'firebase';

const createUserMutation = gql`
mutation($username:String!,$email:String!,$pwd:String!){
    createUser(username:$username,email:$email,pwd:$pwd,admin:false) {
        id
        username
        email
        pwd
        admin
    }
}
`;
const loginQuery = gql`
  mutation($identifier:String!,$pwd:String!){
    login(identifier: $identifier, pwd: $pwd) {
        id
        username
        email
        pwd
        admin
    }
  }
`;

class Login extends Component {

    render() {
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
    signup = async() =>{
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var pwd = document.getElementById("signupPassword").value;
        var confirmPassword = document.getElementById("signupConfirmPassword").value;
        
        if(pwd !== confirmPassword){
            //show error
            alert("Passwords aren't equal");
        }else if(email === null){
            //show error
            alert("email is null")
        }else if(username === null){
            //show error
            alert("username is null")
        }
        else{
            this.props.createUser({
                variables:{
                    username,
                    email,
                    pwd
                }
            }).then(()=>{
                var user = {
                    username : username,
                    email : email,
                    admin : false,
                }
                this.props.login(user);
                alert("You have succesfully created your account!");
                this.props.history.push("/");
            
            }).catch((e)=>{
                console.log('error',e.message);
                switch(e.message){
                    case 'GraphQL error: Username & email already exists':
                        //do stuff
                        alert("email & username unavailable");
                        break;
                    case 'GraphQL error: Username already exists':
                        //do stuff
                        alert("username unavailable");
                        break;
                    case 'GraphQL error: Email already exists':
                        //do stuff
                        alert("email unavailable");
                        break;
                    
                } 
            });
            
        }

    }


    loggingIn = () =>{
        var identifier = document.getElementById("loginEmail").value;
        var pwd = document.getElementById("loginPassword").value;

        if(identifier == null){
            alert("Please type identifier")
        }else if(pwd == null){
            alert("please type password");
        }
        else{
            this.props.loginUser({
                variables:{
                    identifier,
                    pwd
                }
            }).then((data)=>{
                var user = {
                    username : data.data.login.username,
                    email : data.data.login.email,
                    admin : data.data.login.admin,
                }
                //console.log("login",user);
                this.props.login(user);
                alert("You have been logged in!");
                this.props.history.push("/");
            
            }).catch((e)=>{
                console.log('error',e.message);
                switch(e.message){
                    case 'GraphQL error: Password incorrect':
                        //do stuff
                        alert("Password incorrect");
                        break;
                    case 'GraphQL error: Username not found':
                        //do stuff
                        alert("Username not found");
                        break;
                    case 'GraphQL error: Email not found':
                        //do stuff
                        alert("Email not found");
                        break;
                    
                } 
            });
        }


    }


    // loggingIn = () =>{
    //     var email = document.getElementById("loginEmail").value;
    //     var password = document.getElementById("loginPassword").value;
    //     firebase.database().ref('users').once('value',(data)=>{
    //         let json = data.toJSON();
    //         console.log(json);
    //         for(var i = 0 ; i < Object.keys(json).length ; i++){
    //             if(email == json[i].email || email == json[i].username){

    //                 var y = json[i].password;
    //                 var x = SHA256(password);
    //                 let equals = true;
    //                 for(var j = 0 ; j < x.words.length ; j++ ){
    //                     if(x.words[j] != y.words[j]){
    //                         equals = false;
    //                     }
    //                 }

    //                 if(equals === true){
    //                     var login = {
    //                         username : json[i].username,
    //                         email : json[i].email,
    //                         admin : json[i].admin
    //                     }
    //                     this.props.login(login);
    //                     alert("You have succesfully logged in !");
    //                     this.props.history.push("/");
    //                 }else{
    //                     alert("wrong password");
    //                 }
    //             }
    //         }


    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    // }

    // signup = () =>{
    //     var username = document.getElementById("signupUsername").value;
    //     var email = document.getElementById("signupEmail").value;
    //     var password = document.getElementById("signupPassword").value;
    //     var confirmPassword = document.getElementById("signupConfirmPassword").value;

    //     if(username != null && email != null && password != null && password == confirmPassword){
    //         firebase.database().ref('users').once('value',(data)=>{
    //             let nbUsers = 0;

    //             if(data.toJSON()!=null)
    //                 nbUsers = Object.keys(data.toJSON()).length;

    //             firebase.database().ref('users/'+nbUsers).set({
    //                 username : username,
    //                 email : email,
    //                 password : SHA256(password),
    //                 admin : false,
    //             }).then(()=>{
    //                 var user = {
    //                     username : username,
    //                     email : email,
    //                     admin : false,
    //                 }

    //                 this.props.login(user);
    //                 alert("You have succesfully created your account!");
    //                 this.props.history.push("/");
                    
    //             }).catch((error)=>{
    //                 console.log(error);
    //             })
    //         }).catch((error)=>{
    //             console.log(error);
    //         })

    //     }
    // }
}

const mapStateToProps = state =>({
    login: state.login.login
});

export default compose(
    graphql(createUserMutation,{name:"createUser"}),
    graphql(loginQuery,{name:"loginUser"})
  )(connect(mapStateToProps, { login })(Login));