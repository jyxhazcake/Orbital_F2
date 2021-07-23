import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import EventIcon from "@material-ui/icons/Event";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DisplayStudents from "./DisplayStudents";

function SinglePost(props) {
  const firestore = firebase.firestore();
  const [interestedStudents] = useDocumentData(
    firestore.collection("interests").doc(props.post.id)
  );

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

  const dateStart = durationstart.toDate();
  const dateEnd = durationend.toDate();

  function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  }

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

  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg mx-10">
      <img className="object-contain h-64" src={imageURL} alt="imagelol" />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          by{" "}
          <strong className="text-xl">
            {capitalizeTheFirstLetterOfEachWord(name)}
          </strong>
        </p>
        <br></br>
        <div className="font-bold text-xl mb-2">
          {capitalizeTheFirstLetterOfEachWord(title)}
        </div>
        <div className="pb-2">
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
        </div>
        <p>
          <AccessTimeIcon /> {timestart ? tConvert(timestart) : "-"} to{" "}
          {timeend ? tConvert(timeend) : "-"}
        </p>
      </div>
    </div>
  );
}

export default withRouter(SinglePost);
