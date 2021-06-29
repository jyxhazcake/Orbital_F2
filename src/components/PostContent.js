import React, { useState, useEffect } from "react";
import logo from "./img/NUSlogo.png";
import "firebase/firestore";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckIcon from "@material-ui/icons/Check";
import { useDocumentData } from "react-firebase-hooks/firestore";

import firebase from "firebase/app";
import { useAuth } from "../contexts/Authcontext";

import DisplayStudents from "./DisplayStudents";

function PostContent(props) {
  const { currentUser } = useAuth();
  const firestore = firebase.firestore();
  const UsersRef = firestore.collection("Users");
  const postsRef = firestore.collection("posts");
  const interestsRef = firestore.collection("interests");
  const {
    name,
    title,
    durationstart,
    durationend,
    skills,
    uid,
    target,
    imageURL,
  } = props.post;

  const userRef = UsersRef.doc(currentUser?.uid);
  const [user] = useDocumentData(userRef);

  const postID = props.post.id;
  const [error, setError] = useState("");
  const [interest, setInterest] = useState(false);
  const [students, setStudents] = useState([]);

  const interestedStudents = students.length;

  //delete a post
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

  /*handle interest button toggle
  function handleInterestToggled(toToggleStudent, toToggleStudentIndex) {
    const newStudents = [
      // Once again, this is the spread operator
      ...students.slice(0, toToggleStudentIndex),
      {
        uid: toToggleStudent.uid,
        isInterested: !toToggleStudent.isInterested
      },
      ...students.slice(toToggleStudentIndex + 1)
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setStudents(newStudents);
  }*/

  //update the students interested in a post
  async function indicateInterest(e) {
    e.preventDefault();
    //handleInterestToggled()

    setError("");

    const docRef = interestsRef.doc(postID);
    const userUID = currentUser.uid;

    UsersRef.doc(userUID).update({
      interestedPosts: firebase.firestore.FieldValue.arrayUnion(postID),
    });

    docRef.update({
      students: firebase.firestore.FieldValue.arrayUnion(userUID),
    });

    try {
      setInterest(true);
      console.log(students);
    } catch {
      setError("Could not retrieve interested students");
      console.log(error);
    }
  }

  // everytime the page renders the interest and number of students interested in a post is set
  useEffect(() => {
    const docRef = interestsRef.doc(postID);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setStudents(doc.data().students);
      }
    });
  });

  return (
    <>
      <div
        className={
          "flex bg-white shadow-md my-4 mx-20 p-6 rounded items-center"
        }
      >
        <div>
          <img
            src={imageURL ? imageURL : logo}
            width="150"
            height="50"
            alt="logo"
          />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <h3 className="font-bold text-blue-900"> {name} </h3>
          <h2 className="font-bold text-xl"> {title} </h2>
          <p className="text-gray-700">
            {" "}
            Duration: {durationstart} - {durationend}{" "}
          </p>
        </div>
        <div className="flex items-center justify-end ml-auto">
          {" "}
          <span className="text-blue-500 bg-blue-100 font-bold m-2 p-2 rounded">
            {" "}
            {skills}{" "}
          </span>{" "}
        </div>{" "}
        {currentUser ? (
          currentUser.email === "admin@admin.sg" || currentUser === uid ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={deletePost}
            >
              {" "}
              Delete
            </Button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {user?.Class === "student" && (
          <div>
            <IconButton
              color="primary"
              aria-label="Comment"
              className={"focus:outline-none"}
            >
              <CommentIcon />
            </IconButton>
            {students.some((item) => currentUser?.uid === item) ? (
              <IconButton
                color="primary"
                aria-label="Like"
                className={"focus:outline-none"}
              >
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                aria-label="Like"
                className={"focus:outline-none"}
                onClick={indicateInterest}
              >
                <AddCircleIcon />
              </IconButton>
            )}
          </div>
        )}
        <div className="ml-3">
          {interestedStudents} student{interestedStudents === 1 ? "" : "s"}
        </div>
      </div>
      <div className="ml-20 mb-20">
        <p className="font-bold text-l">Interested Students: </p>
        {students &&
          students.map((stdent) => (
            <DisplayStudents key={stdent.id} student={stdent} />
          ))}
      </div>
    </>
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
