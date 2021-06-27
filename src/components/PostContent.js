import React, { useState } from "react";
import logo from "./img/NUSlogo.png";
import "firebase/firestore";
import DelButton from "./DelButton";
import { Button } from "@material-ui/core";
import { Alert } from 'react-native';
import firebase from "firebase/app";
import { useAuth } from "../contexts/Authcontext";

function PostContent(props) {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const {
    name,
    title,
    durationstart,
    durationend,
    skills,
    uid,
    target,
    photoURL,
  } = props.post;

  const postID = props.post.id;
  const { currentUser } = useAuth();
  const [error, setError] = useState("");


  return (
    <>
      <div className={"flex bg-white shadow-md my-4 mx-60 p-6 rounded items-center"}>
        <div>
          <img src={logo} alt="nuslogo" />
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
        {currentUser.uid === uid ?
          <Button variant="contained" onClick={() => postsRef.doc(postID).delete()}>
            {" "}
            Delete Post
          </Button>
          : null}
      </div>
    </>
  );
}

export default PostContent;

//postsRef.doc(postID).delete()