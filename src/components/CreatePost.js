import React from "react";
import { useState } from "react";
import firebase from "firebase/app";
import { TextField, Button } from "@material-ui/core";
import { useAuth } from "../contexts/Authcontext";

export default function CreatePost() {
  const { currentUser } = useAuth();
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const adminRef = firestore.collection("AdminApproval");
  const [error, setError] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [durstartValue, setDurstartValue] = useState("");
  const [durendValue, setDurendValue] = useState("");
  const [skillsValue, setSkillsValue] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;
    setError("");

    try {
      await adminRef.add({
        name: currentUser.displayName,
        title: titleValue,
        durationstart: durstartValue,
        durationend: durendValue,
        skills: skillsValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        imageURL: currentUser.photoURL,
        uid,
      });
    } catch {
      setError("Failed to submit post! Please contact admin");
    }
  };

  return (
    <div className="flex bg-white shadow-md m-10 py-8 px-6 rounded-lg sm:px-10">
      <form onSubmit={createPost} className="mb-0 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {" "}
          Create a Volunteer Opportunity{" "}
        </label>{" "}
        <TextField
          value={titleValue}
          placeholder="Title of Opportunity"
          onChange={(e) => setTitleValue(e.target.value)}
        />{" "}
        <TextField
          value={durstartValue}
          placeholder="Duration start"
          onChange={(e) => setDurstartValue(e.target.value)}
        />{" "}
        <TextField
          value={durendValue}
          placeholder="Duration End"
          onChange={(e) => setDurendValue(e.target.value)}
        />{" "}
        <TextField
          value={skillsValue}
          placeholder="Skills required"
          onChange={(e) => setSkillsValue(e.target.value)}
        />{" "}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
}
