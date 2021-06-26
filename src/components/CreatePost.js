import React from "react";
import { useState } from "react";
import firebase from "firebase/app";
import { TextField, Button } from "@material-ui/core";

export default function CreatePost() {
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const postsRef = firestore.collection("posts");
  const [error, setError] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [durstartValue, setDurstartValue] = useState("");
  const [durendValue, setDurendValue] = useState("");
  const [skillsValue, setSkillsValue] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;
    setError("");

    try {
      await postsRef.add({
        name: nameValue,
        title: titleValue,
        durationstart: durstartValue,
        durationend: durendValue,
        skills: skillsValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
      });
    } catch {
      setError("Failed to create post! Please contact admin");
    }

    setNameValue("");
  };

  return (
    <div className="flex bg-white shadow-md py-8 px-6 rounded-lg sm:px-10">
      <form onSubmit={createPost} className="mb-0 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {" "}
          Your Information{" "}
        </label>
        <TextField
          value={nameValue}
          placeholder="Name"
          onChange={(e) => setNameValue(e.target.value)}
        />{" "}
        <label className="block text-sm font-medium text-gray-700">
          {" "}
          Post Content{" "}
        </label>
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
