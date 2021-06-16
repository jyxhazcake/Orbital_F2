import React from "react";
import { Card, CardContent, TextField, Paper } from "@material-ui/core";
import BootstrapButton from "./BootstrapButton";
import { makeStyles } from "@material-ui/core/styles";
import { findByLabelText } from "@testing-library/dom";
import LoginButton from "./LoginButton";
import { Redirect } from "react-router-dom";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";

const StuLogin = () => {
  const handleGoogleLogIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <div>
      <FirebaseAuthConsumer>
        <IfFirebaseUnAuthed>
          {({ firebase }) => (
            <LoginButton onClick={() => handleGoogleLogIn(firebase)}>
              Sign in with Google
            </LoginButton>
          )}
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          <Redirect to="/opportunities" />
        </IfFirebaseAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
};

export default StuLogin;
