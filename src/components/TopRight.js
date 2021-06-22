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
import { Link } from 'react-router-dom';
import { Box } from "@material-ui/core";

const TopRight = () => {
  /*const handleLogIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };*/

  const handleLogout = (firebase) => {
    firebase.auth().signOut();
  };

  return (
    <div class="flex justify-between">
    <Link to='/'>
    <img src={logo} class="w-17 md:w-32 lg:w-48" alt="NUSlogo" />
    </Link>
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <Link to="/">
            <BootstrapButton onClick={() => handleLogout(firebase)}>
              Logout
            </BootstrapButton>
            </Link>
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <div class="flex justify-baseline">
            <Link to="/studentlogin">
              <LoginButton>Student Login</LoginButton>
            </Link>
            <Link to="/recruiterlogin">
              <RecruiterButton>Recruiters</RecruiterButton>
            </Link>
          </div>
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
};

export default TopRight;