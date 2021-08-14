import { useState, React } from "react";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";

import { Link } from "react-router-dom";

export default function PostAdmin(props) {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  const interestRef = firestore.collection("interests");
  const adminRef = firestore.collection("AdminApproval");
  const [error, setError] = useState("");
  const postID = props.post.id;

  const {
    name,
    title,
    durationstart,
    durationend,
    timestart,
    timeend,
    region,
    address,
    postalCode,
    description,
    skills,
    uid,
    volunteerNo,
    imageURL,
  } = props.post;

  const dateStart = durationstart.toDate();
  const dateEnd = durationend.toDate();

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

  const approvePost = async (e) => {
    e.preventDefault();

    setError("");
    //handling of post creation:
    try {
      await postsRef.doc(postID).set({
        name: name,
        title: title,
        durationstart: durationstart,
        durationend: durationend,
        timestart: timestart,
        timeend: timeend,
        region: region,
        address: address,
        postalCode: postalCode,
        volunteerNo: volunteerNo,
        skills: skills,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        imageURL: imageURL,
        uid: uid,
        description: description,
      });
      adminRef.doc(postID).delete();
    } catch {
      setError("Failed to create post!");
    }

    //handling of interest creation
    try {
      await interestRef.doc(postID).set({
        students: [],
      });
    } catch {
      setError("Interest could not be created!");
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();

    await adminRef.doc(postID).delete();
  };

  return (
    <div key={props.id}>
      {error && <Alert severity="error">{error}</Alert>}
      <Link to={"/preview/" + postID}>
        <div className="flex bg-green-400 shadow-md my-2 mx-10 p-6 rounded items-center">
          <div>
            <img src={imageURL} width="100" height="100" alt="logo" />
          </div>
          <div className="flex flex-col justify-between ml-4">
            <h3 className="font-bold text-blue-900"> {name} </h3>
            <h2 className="font-bold text-xl"> {title} </h2>
            <p className="text-gray-700">
              {" "}
              Duration:{" "}
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
            <p>
              Time:
              {timestart ? tConvert(timestart) : "-"} to{" "}
              {timeend ? tConvert(timeend) : "-"}
            </p>
            <p>
              Location: {address}, {postalCode}
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
          &nbsp;
          <Button variant="contained" onClick={deletePost}>
            {" "}
            Reject Post
          </Button>
        </div>
      </Link>
    </div>
  );
}
