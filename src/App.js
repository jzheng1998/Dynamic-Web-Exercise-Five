import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import "./App.css";
import CreateAccount from "./containers/CreateAccount";
import Login from "./containers/Login";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "dm-exercise-five.firebaseapp.com",
  projectId: "dm-exercise-five",
  storageBucket: "dm-exercise-five.appspot.com",
  messagingSenderId: "96162231817",
  appId: "1:96162231817:web:fe59a01b26d84739f1ead8",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserInformation(user);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  const LoginFunction = (e) => {
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("LOGIN SUCCESS", response);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("LOGIN ERROR", error);
      });
  };

  const LogoutFunction = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setUserInformation({});
      })
      .catch((error) => {
        console.log("LOGOUT ERROR", error);
      });
  };

  const CreateAccountFunction = (e) => {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("VALID ACCOUNT CREATED WITH ", email, password);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("ACCOUNT CREATION FAILED", error);
      });
  };

  if (loading) return null;

  return (
    <div className="App">
      <Router>
        <Header loggedIn={loggedIn} Logout={LogoutFunction} />
        <Route exact path="/login">
          {!loggedIn ? (
            <Login LoginFunction={LoginFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-account">
          {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <UserProfile userInformation={userInformation} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
