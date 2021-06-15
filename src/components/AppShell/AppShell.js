import React from "react";
import TopRight from "../TopRight";
import { AppBar, Toolbar } from "@material-ui/core";
import BootstrapButton from "../BootstrapButton";
import { Link } from "react-router-dom";

function AppShell() {
  return (
    <>
      <TopRight />
      <AppBar position="static" style={{ background: "#EDEDED" }}>
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
