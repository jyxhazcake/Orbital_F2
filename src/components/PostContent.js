import React from "react";
import logo from "./img/NUSlogo.png";
import "firebase/firestore";

function PostContent(props) {
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
  return (
    <>
      <div className="flex bg-white shadow-md m-4 p-6 rounded">
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
        <div className="flex items-center justify-center">
          {" "}
          <span className="text-blue-500 bg-blue-100 font-bold m-2 p-2 rounded">
            {" "}
            {skills}{" "}
          </span>{" "}
        </div>{" "}
      </div>
    </>
  );
}

export default PostContent;
