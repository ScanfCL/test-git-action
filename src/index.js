import React from "react";
import ReactDOM from "react-dom";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import firebase from "firebase/app";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configs } from "./config/configs";

firebase.initializeApp(configs.firebase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
