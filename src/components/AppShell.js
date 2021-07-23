import React, { useEffect } from "react";
import TopRight from "./TopRight";
import { AppBar, Toolbar } from "@material-ui/core";
import BootstrapButton from "./BootstrapButton";
import { Link } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import SignOut from "./SignOut";
import logo from "./img/NUSlogo.png";
import logo2 from "./img/CCSGP.png";

const firestore = firebase.firestore();

function AppShell() {
  const [currentUser] = useAuthState(firebase.auth());
  const userRef = firestore.collection("Users").doc(currentUser?.uid);
  const [user] = useDocumentData(userRef);

  return (
    <>
      <div className="flex justify-between">
        <Link to="/">
          <img src={logo2} className="w-60 ml-5 mt-5" alt="NUSlogo" />
        </Link>
        {currentUser ? <SignOut /> : <TopRight />}
      </div>
      <AppBar elevation={0} position="static" style={{ background: "#EDEDED" }}>
        <Toolbar>
          <Link to="/">
            <BootstrapButton color="default">Home</BootstrapButton>
          </Link>
          <Link to="/opportunities">
            <BootstrapButton color="default">Opportunities</BootstrapButton>
          </Link>
          {user?.Class === "recruiter" ? (
            <Link to="/myposts">
              <BootstrapButton color="default">My Postings</BootstrapButton>
            </Link>
          ) : user?.Class === "admin" ? (
            <Link to="/approvals">
              <BootstrapButton color="default">Approvals</BootstrapButton>
            </Link>
          ) : (
            <Link to="/organisations">
              <BootstrapButton color="default">Organisations</BootstrapButton>
            </Link>
          )}
          <Link to="/about">
            <BootstrapButton color="default">About</BootstrapButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppShell;
