import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
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

  function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  }

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src={imageURL} alt="imagelol" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          {capitalizeTheFirstLetterOfEachWord(title)}
        </div>
        <p class="text-gray-700 text-base">
          {capitalizeTheFirstLetterOfEachWord(name)}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2"></div>{" "}
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

export default withRouter(SinglePost);
