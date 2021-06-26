import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";

export default function DelButton(props) {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const [error, setError] = useState("");

  const deletePost = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await postsRef.doc(props).delete();
    } catch {
      setError("Unable to delete post");
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => deletePost}>
        {" "}
        Remove Post
      </Button>
    </div>
  );
}
