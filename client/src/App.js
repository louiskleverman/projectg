import React, { Component } from 'react';
import './css/App.css';

import Home from "./pages/Home.js";
import Classes from "./pages/Classes.js";
import News from "./pages/News.js";
import AddNews from "./pages/AddNews.js";
import Article from "./pages/Article.js";
import Login from "./pages/Login.js";
import EditArticle from "./pages/EditArticle.js"

import Navigation from "./components/Navigation.js"
import Footer from "./components/Footer.js"

import { BrowserRouter , Route, Switch} from "react-router-dom"
import { withCookies } from 'react-cookie';

//Redux Login
import { connect } from 'react-redux';
import { login } from './actions/loginActions'

//GraphQL for login
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo';


const loginQuery = gql`
  mutation($id:ID!,$expire:Int!){
    loginCookie(id: $id, expire: $expire) {
      id
      username
      email
      pwd
      admin
    }
  }
`;

class App extends Component {
  componentDidMount(){
    if(this.props.cookies.cookies.loginId != null){
      console.log("cookies",this.props.cookies.cookies)
      this.props.loginUserCookies({
        variables:{
            id:this.props.cookies.cookies.loginId,
            expire:parseInt(this.props.cookies.cookies.loginExpire)
        }
      }).then((data)=>{
        console.log("data",data);
          var user = {
              username : data.data.loginCookie.username,
              email : data.data.loginCookie.email,
              admin : data.data.loginCookie.admin,
          }
          this.props.login(user);
          //alert("You have been logged in!");
          this.props.history.push("/");
      
      }).catch((e)=>{
          console.log('error',e.message);
      });
    }
  }
  render() {
    return (
        <div className="App">
          <BrowserRouter>
            <div>
              <Navigation/>
              <header className="header">
                <h1>Project G</h1>
                <p>The next BIG MMO</p>
              </header>

              <Switch>
                <Route path="/" render={(props)=> <Home {...props}/>} exact/> 
                <Route path="/classes" render={(props)=> <Classes/>} /> 
                <Route path="/news" render={(props)=> <News/>} /> 
                <Route path="/addNews" render={(props)=> <AddNews {...props}/>} /> 
                <Route path="/login" render={(props)=> <Login {...props}/>} /> 
                <Route path="/article/:id" render={(props)=> <Article {...props}/>} /> 
                <Route path="/editArticle" render={(props)=> <EditArticle {...props}/>} /> 
              </Switch>
              <Footer/>
            </div>
          </BrowserRouter>

        </div>
    );
  }
}

const mapStateToProps = state =>({
  login: state.login.login
});

export default withCookies(compose(
  graphql(loginQuery,{name:"loginUserCookies"})
  )(connect(mapStateToProps, { login })(App))
);
