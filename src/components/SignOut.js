import React from "react";
import BootstrapButton from "./BootstrapButton";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

const auth = firebase.auth();

export default function SignOut() {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <Link to="/">
        <BootstrapButton onClick={() => handleLogout(firebase)}>
          Logout
        </BootstrapButton>
      </Link>
    </div>
  );
}
