import React, { Component } from 'react';
import "../css/login.css"
import { connect } from 'react-redux';
import { login } from '../actions/loginActions'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo';

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
                        <p id="loginEmailInfo" className="inputInfo">*Username invalid</p>
                        <input id="loginEmail" type="email" placeholder="Email or Username"/>
                        <p id="loginPasswordInfo" className="inputInfo">*Password invalid</p>
                        <input id="loginPassword" type="password" placeholder="Your password"/>
                        <button onClick={()=>this.loggingIn()}>Login</button>
                    </div>
                    <div className="col-md-6" id="signup">
                        <h2>Sign up</h2>
                        <p>Sign up to get access to the game and the websites functionalities.</p>
                        <p id="signupUsernameInfo" className="inputInfo">*Username invalid</p>
                        <input id="signupUsername" type="text" placeholder="Username" required/>
                        <p id="signupEmailInfo" className="inputInfo">*Username invalid</p>
                        <input id="signupEmail" type="email" placeholder="Email" required/>
                        <p id="signupPasswordInfo" className="inputInfo">*Username invalid</p>
                        <input id="signupPassword" type="password" placeholder="Your password" required/>
                        <input id="signupConfirmPassword" type="password" placeholder="Confirm password" required/>
                        <button onClick={()=>{this.signup()}}>sign up</button>
                    </div>
                </div>
            </div>
        );
    }

    infoText = (id,text) => {
        let p = document.getElementById(id);
        p.innerHTML = text;
        p.style.display = "block";
    }
    infoTextReset = () =>{
        let infos = document.getElementsByClassName("inputInfo");
        for(var i = 0 ; i < infos.length ; i++ ){
            infos[i].style.display = "none";
        }

    }

    signup = async() =>{
        this.infoTextReset();
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var pwd = document.getElementById("signupPassword").value;
        var confirmPassword = document.getElementById("signupConfirmPassword").value;
        
        if(pwd !== confirmPassword){
            //show error
            this.infoText("signupPasswordInfo","*Passwords don't match.");
        }else if(email === ""){
            //show error
            this.infoText("signupEmailInfo","*Please type your email.");
        }else if(username === ""){
            //show error
            this.infoText("signupUsernameInfo","*Please type your username.");
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
                        this.infoText("signupUsernameInfo","*Username unavailable.");
                        this.infoText("signupEmailInfo","*Email unavailable.");
                        break;
                    case 'GraphQL error: Username already exists':
                        //do stuff
                        this.infoText("signupUsernameInfo","*Username unavailable.");
                        break;
                    case 'GraphQL error: Email already exists':
                        //do stuff
                        this.infoText("signupEmailInfo","*Email unavailable.");
                        break;
                } 
            });
            
        }

    }


    loggingIn = () =>{
        this.infoTextReset();
        var identifier = document.getElementById("loginEmail").value;
        var pwd = document.getElementById("loginPassword").value;

        if(identifier === ""){
            this.infoText("loginEmailInfo","*Please type your Username or your email.");
        }else if(pwd === ""){
            this.infoText("loginPasswordInfo","*Please type your password.");
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
                        this.infoText("loginPasswordInfo","*Password incorrect.")
                        break;
                    case 'GraphQL error: Username not found':
                        //do stuff
                        this.infoText("loginEmailInfo","*Username not found.");
                        break;
                    case 'GraphQL error: Email not found':
                        //do stuff
                        this.infoText("loginEmailInfo","*Email not found.");
                        break;
                } 
            });
        }
    }

}

const mapStateToProps = state =>({
    login: state.login.login
});

export default compose(
    graphql(createUserMutation,{name:"createUser"}),
    graphql(loginQuery,{name:"loginUser"})
  )(connect(mapStateToProps, { login })(Login));