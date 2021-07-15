import React, { useState, useEffect } from "react";
import logo from "./img/NUSlogo.png";
import "firebase/firestore";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventIcon from "@material-ui/icons/Event";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckIcon from "@material-ui/icons/Check";
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

import DisplayStudents from "./DisplayStudents";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    backgroundColor: grey[200],
  },
  media: {
    height: 200,
    width: "100%",
    objectFit: "cover",
  },
});

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
    timestart,
    timeend,
    description,
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

  return (
    <div key={props.id}>
      <Card className={classes.root}>
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
            <Typography variant="h5" component="h2">
              <strong>{capitalizeTheFirstLetterOfEachWord(title)}</strong>
            </Typography>
            <p>
              by <strong>{name}</strong>
            </p>
            <br></br>
            <Typography variant="body2" color="textSecondary" component="p">
              <p>
                <EventIcon />:{" "}
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
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <br></br>
      <div className="ml-20 mb-20">
        <p className="font-bold text-l">Interested Students: </p>
        {interestedStudents?.students &&
          interestedStudents?.students.map((stdent) => (
            <DisplayStudents key={stdent.id} student={stdent} />
          ))}
      </div>
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
