import React, { useState, useEffect } from "react";
import logo from "./img/NUSlogo.png";
import "firebase/firestore";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import RoomIcon from "@material-ui/icons/Room";
import DeleteIcon from "@material-ui/icons/Delete";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventIcon from "@material-ui/icons/Event";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import firebase from "firebase/app";
import { useAuth } from "../contexts/Authcontext";
import { Link } from "react-router-dom";

import DisplayStudents from "./DisplayStudents";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 220,
    maxWidth: 300,
    backgroundColor: grey[100],
    hover: {
      elevate: 50,
    },
  },
  media: {
    height: 200,
    width: "100%",
    objectFit: "cover",
  },
}));

//from: https://www.tutorialspoint.com/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

function PostContent(props) {
  const { currentUser } = useAuth();
  const firestore = firebase.firestore();
  const UsersRef = firestore.collection("Users");
  const postsRef = firestore.collection("posts");
  const interestsRef = firestore.collection("interests");
  const {
    createdAt,
    name,
    title,
    durationstart,
    durationend,
    volunteerNo,
    timestart,
    timeend,
    region,
    skills,
    uid,
    target,
    imageURL,
  } = props.post;

  const userRef = UsersRef.doc(currentUser?.uid);
  const [user] = useDocumentData(userRef);

  const postID = props.post.id;
  const [error, setError] = useState("");
  //const [students, setStudents] = useState([]);

  //const interestedStudents = students.length;
  const created = createdAt?.toDate();
  const dateStart = durationstart.toDate();
  const dateEnd = durationend.toDate();

  const [interestedStudents] = useDocumentData(interestsRef.doc(postID));

  const classes = useStyles();

  //modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const deletePost = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await postsRef.doc(postID).delete();
      await interestsRef.doc(postID).delete();
    } catch {
      setError("Failed to delete post.");
    }
  };

  return (
    <div key={props.id}>
      <Card className={classes.root}>
        <Link to={"/opportunities/" + postID}>
          <CardActionArea className="focus:outline-none">
            <CardMedia
              className={classes.media}
              image={imageURL ? imageURL : logo}
              title="posting"
            />
            <CardContent>
              <div>
                {Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  year: "numeric",
                  day: "2-digit",
                  month: "short",
                }).format(created)}
              </div>
              <Typography variant="h5" component="h2" className="truncate">
                <strong>{capitalizeTheFirstLetterOfEachWord(title)}</strong>
              </Typography>
              <p className="pb-2">
                by <strong>{name}</strong>
              </p>
              {volunteerNo -
                (interestedStudents
                  ? interestedStudents.students.length
                  : 0) ===
              0 ? (
                <p className="text-base font-bold"> - All slots filled -</p>
              ) : (
                <p className="text-base">
                  <strong>Slots left: </strong>
                  {volunteerNo -
                    (interestedStudents
                      ? interestedStudents.students.length
                      : 0)}
                  /{volunteerNo}
                </p>
              )}
              <br></br>
              <Typography variant="body2" color="textSecondary" component="p">
                <p className="pb-2">
                  <EventIcon />{" "}
                  {Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    year: "numeric",
                    day: "2-digit",
                    month: "short",
                  }).format(dateStart)}{" "}
                  -{" "}
                  {Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    year: "numeric",
                    day: "2-digit",
                    month: "short",
                  }).format(dateEnd)}
                </p>
                <p className="pb-3">
                  <AccessTimeIcon /> {timestart ? tConvert(timestart) : "-"} to{" "}
                  {timeend ? tConvert(timeend) : "-"}
                </p>
                <p className="pb-2">
                  <RoomIcon /> {capitalizeTheFirstLetterOfEachWord(region)}
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions style={{ justifyContent: "center" }}>
          <Link to={"/opportunities/" + postID}>
            <Button size="small" color="primary" style={{ outline: "none" }}>
              Learn More
            </Button>
          </Link>
          {currentUser ? (
            currentUser.email === "admin@admin.sg" ||
            currentUser.uid === uid ? (
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleOpen}
                  style={{ outline: "none" }}
                >
                  {" "}
                  Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm Post deletion?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Deleted posts can <strong>no longer be recovered.</strong>
                      <br></br>
                      Please confirm that you wish to delete the post before
                      proceeding.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={deletePost}
                      variant="contained"
                      color="secondary"
                    >
                      Confirm Delete
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
      <br></br>
    </div>
  );
}

export default PostContent;

/* 
temporarily removes liked function
<IconButton
  color="secondary"
  aria-label="Like"
  className={"focus:outline-none"}
  onClick={updateLikes}
>
  <FavoriteBorderIcon />
</IconButton>
<p className="text-sm"> 3 Likes </p> */

/*
failed date format

function join(date, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(date);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];


{dateStart.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}{" "}
                  {", "}
                  {join(dateStart, a, " ")} {" — "}
                  {dateEnd.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}{" "}
                  {", "}
                  {join(dateEnd, a, " ")}
*/
