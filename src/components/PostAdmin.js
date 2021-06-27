import { useState, React } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import logo from "./img/NUSlogo.png";
export default function PostAdmin(props) {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const adminRef = firestore.collection("AdminApproval");
  const [error, setError] = useState("");
  const postID = props.post.id;

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

  const approvePost = async (e) => {
    e.preventDefault();

    setError("");
    try {
      await postsRef.add({
        name: name,
        title: title,
        durationstart: durationstart,
        durationend: durationend,
        skills: skills,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
      });
      adminRef.doc(postID).delete();
    } catch {
      setError("Failed to create post!");
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();

    await adminRef.doc(postID).delete();
  };

  return (
    <>
      <div className="flex bg-green-400 shadow-md my-2 mx-10 p-6 rounded items-center">
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
        <Button variant="contained" onClick={approvePost}>
          {" "}
          Approve Post
        </Button>
        <Button variant="contained" onClick={deletePost}>
          {" "}
          Reject Post
        </Button>
      </div>
    </>
  );
}