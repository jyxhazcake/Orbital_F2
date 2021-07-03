import React from "react";
import logo from "./img/NUSlogo.png";
import BootstrapButton from "./BootstrapButton";
import LoginButton from "./LoginButton";
import RecruiterButton from "./RecruiterButton";
import { Link } from "react-router-dom";

const buttonStyle = {
  margin: "20px 20px",
};

const TopRight = () => {
  return (
    <div className="flex justify-baseline">
      <Link to="/studentlogin">
        <LoginButton style={buttonStyle}>Students</LoginButton>
      </Link>
      <Link to="/recruiterlogin">
        <RecruiterButton style={buttonStyle}>Recruiters</RecruiterButton>
      </Link>
    </div>
  );
};

export default TopRight;
