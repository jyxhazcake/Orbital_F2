import React from "react";
import TopRight from "../TopRight";
import { AppBar, Toolbar } from "@material-ui/core";
import BootstrapButton from "../BootstrapButton";

function AppShell() {
  return (
    <>
      <TopRight />
      <AppBar position="static" style={{ background: "#EDEDED" }}>
        <Toolbar>
          <BootstrapButton color="default">Home</BootstrapButton>
          <BootstrapButton color="default">Opportunities</BootstrapButton>
          <BootstrapButton color="default">Organisations</BootstrapButton>
          <BootstrapButton color="default">About</BootstrapButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppShell;
