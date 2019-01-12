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
import { Provider } from 'react-redux';
import { store } from './store.js';


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
