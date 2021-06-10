import React from "react";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import logo from "./img/NUSlogo.png";
import BootstrapButton from "./BootstrapButton";
import LoginButton from "./LoginButton";
import RecruiterButton from "./RecruiterButton";
import { Box } from "@material-ui/core";

const TopRight = () => {
  const handleLogIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const handleLogout = (firebase) => {
    firebase.auth().signOut();
  };

  return (
    <div class="flex justify-between">
      <img src={logo} class="w-17 md:w-32 lg:w-48" alt="NUSlogo" />
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <BootstrapButton onClick={() => handleLogout(firebase)}>
              Logout
            </BootstrapButton>
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          {({ user, firebase }) => (
            <div class="flex justify-baseline">
              <LoginButton onClick={() => handleLogIn(firebase)}>
                Student Login
              </LoginButton>
              <RecruiterButton>Recruiters</RecruiterButton>
            </div>
          )}
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
};

export default TopRight;