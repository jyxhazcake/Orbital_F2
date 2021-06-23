import React, { useState } from "react";
import BootstrapButton from "./BootstrapButton";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useAuth } from "../contexts/Authcontext";

const auth = firebase.auth();

export default function SignOut() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/studentlogin");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <div className="font-bold"> Current User: </div> {currentUser.email}
      <Link to="/">
        <BootstrapButton onClick={() => handleLogout()}>Logout</BootstrapButton>
      </Link>
    </div>
  );
}
