import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import Config from "./Config.js";

import { CookiesProvider } from 'react-cookie';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { Provider } from 'react-redux';
import { store } from './store.js';

const client = new ApolloClient({
    uri: "http://localhost:4000"
});

firebase.initializeApp(Config);

ReactDOM.render(
    <CookiesProvider>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </CookiesProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
