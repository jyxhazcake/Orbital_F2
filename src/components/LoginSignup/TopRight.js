import React from "react";
import Divider from "@material-ui/core/Divider";
import LoginButton from "../Button/LoginButton";
import RecruiterButton from "../Button/RecruiterButton";
import { Link } from "react-router-dom";

const buttonStyle = {
  margin: "20px 20px",
  outline: "none",
};

const TopRight = () => {
  return (
    <div className="flex justify-baseline">
      <Link to="/studentlogin">
        <LoginButton style={buttonStyle}>Students</LoginButton>
      </Link>
      <Divider
        orientation="vertical"
        style={{ height: 48, margin: "22px 0", width: 2 }}
      />
      <Link to="/recruiterlogin">
        <RecruiterButton style={buttonStyle}>Recruiters</RecruiterButton>
      </Link>
    </div>
  );
};

export default TopRight;
