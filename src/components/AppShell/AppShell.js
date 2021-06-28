import React from "react";
import TopRight from "../TopRight";
import { AppBar, Toolbar } from "@material-ui/core";
import BootstrapButton from "../BootstrapButton";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import SignOut from "../SignOut";
import logo from "../img/NUSlogo.png";
import logo2 from "../img/NVJBlogo.png";

function AppShell() {
  const [user] = useAuthState(firebase.auth());

  return (
    <>
      <div className="flex justify-between">
        <Link to="/">
          <img
            src={logo2}
            className="w-18 md:w-20 lg:w-22 ml-10"
            alt="NUSlogo"
          />
        </Link>
        {user ? <SignOut /> : <TopRight />}
      </div>
      <AppBar elevation={0} position="static" style={{ background: "#EDEDED" }}>
        <Toolbar>
          <Link to="/">
            <BootstrapButton color="default">Home</BootstrapButton>
          </Link>
          <Link to="/opportunities">
            <BootstrapButton color="default">Opportunities</BootstrapButton>
          </Link>
          <Link to="/organisations">
            <BootstrapButton color="default">Organisations</BootstrapButton>
          </Link>
          <Link to="/about">
            <BootstrapButton color="default">About</BootstrapButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppShell;
