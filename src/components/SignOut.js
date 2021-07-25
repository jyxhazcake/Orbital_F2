import React, { useState, useEffect } from "react";
import BootstrapButton from "./BootstrapButton";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useAuth } from "../contexts/Authcontext";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, MenuItem, Menu as MaterialMenu } from "@material-ui/core";
import { blue, deepOrange, deepPurple } from "@material-ui/core/colors";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { BellIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[700],
  },
}));

export default function SignOut() {
  const firestore = firebase.firestore();
  const { currentUser, logout } = useAuth();
  const [user] = useDocumentData(
    firestore.collection("Users").doc(currentUser?.uid)
  );
  const [error, setError] = useState("");
  const history = useHistory();
  const colors = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div style={{ outline: "none" }} className="flex justify-end">
      <button className="rounded-full text-yellow-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {currentUser?.photoURL ? (
        <Avatar
          className={colors.blue + " m-5 cursor-pointer"}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          alt="profilePic"
          src={currentUser.photoURL}
        />
      ) : (
        <Avatar
          className={colors.blue + " m-5 cursor-pointer"}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {currentUser?.displayName?.charAt(0)}
        </Avatar>
      )}
      <MaterialMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem> Signed in as {currentUser?.displayName}</MenuItem>
        {user?.Class === "recruiter" ? (
          <Link to={"/profile/org/" + currentUser.uid}>
            <MenuItem>Edit My Info</MenuItem>{" "}
          </Link>
        ) : (
          <Link to={"/profile/student/" + currentUser.uid}>
            <MenuItem>Edit My Info</MenuItem>
          </Link>
        )}
        <Link to="/">
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Link>
      </MaterialMenu>
    </div>
  );
}
