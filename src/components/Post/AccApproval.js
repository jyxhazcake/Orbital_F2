import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";

export default function AccApproval(props) {
  const firestore = firebase.firestore();
  const adminRef = firestore.collection("AccountRequest");
  const { Contact, ContactMobile, Email, Organisation, OrganisationMobile } =
    props.post;
  const [error, setError] = useState("");

  const deletePost = async (e) => {
    e.preventDefault();

    try {
      await adminRef.doc(props.post.id).delete();
      console.log(props.post.id);
    } catch {
      setError("Unable to clear post!");
    }
  };

  return (
    <>
      <div key={props.id}>
        <div className="flex bg-blue-400 shadow-md my-2 mx-10 p-6 rounded items-center">
          <div className="flex flex-col justify-between ml-4">
            <h3 className="font-bold text-blue-900"> {Email} </h3>
            <h2 className="font-bold text-xl"> {Organisation} </h2>
            <p className="text-gray-700">
              Contact Person: <span className="font-bold">{Contact}</span>
            </p>
            <p className="text-gray-700">
              Contact Person's Mobile:{ContactMobile}
            </p>
            <p className="text-gray-700">
              Organisation's Contact Number:{OrganisationMobile}
            </p>
          </div>
          <Button variant="contained" onClick={deletePost}>
            {" "}
            Clear
          </Button>
        </div>
      </div>
      {error}
    </>
  );
}
