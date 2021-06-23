import React from "react";
import logo from "./img/NUSlogo.png";

const PostContent = () => {
  return (
    <>
      <div className="flex bg-white shadow-md m-4 p-6 rounded">
        <div>
          <img src={logo} alt="nuslogo" />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <h3 className="font-bold text-blue-900"> Organisation Name </h3>
          <h2 className="font-bold text-xl"> Title of volunteer work </h2>
          <p className="text-gray-700"> Duration: 01/01/20 - 12/12/21 </p>
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <span className="text-blue-500 bg-blue-100 font-bold m-2 p-2 rounded">
            {" "}
            Necessary Skills{" "}
          </span>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default PostContent;
