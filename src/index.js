import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { FirebaseAuthProvider } from "@react-firebase/auth";

import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

import { config } from "./config/firebase";

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <App />
      </FirebaseAuthProvider>
  </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();