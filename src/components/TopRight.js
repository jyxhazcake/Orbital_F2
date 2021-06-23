import React from "react";
import logo from "./img/NUSlogo.png";
import BootstrapButton from "./BootstrapButton";
import LoginButton from "./LoginButton";
import RecruiterButton from "./RecruiterButton";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

const TopRight = () => {
  /*const handleLogIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };*/

  return (
    <div class="flex justify-baseline">
      <Link to="/studentlogin">
        <LoginButton>Student Login</LoginButton>
      </Link>
      <Link to="/recruiterlogin">
        <RecruiterButton>Recruiters</RecruiterButton>
      </Link>
    </div>
  );
};

export default TopRight;
