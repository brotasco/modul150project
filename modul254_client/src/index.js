import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import './index.scss'

import { PersistGate } from 'redux-persist/integration/react'

const config = {
    apiKey: "AIzaSyAZB7uTjZ9563gPRdw5_r-UDihCCo2h12I",
    authDomain: "modul254project.firebaseapp.com",
    databaseURL: "https://modul254project.firebaseio.com",
    projectId: "modul254project",
    storageBucket: "modul254project.appspot.com",
    messagingSenderId: "794676217911"
}

firebase.initializeApp(config);

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
