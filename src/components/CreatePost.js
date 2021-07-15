import React from "react";
import { useState } from "react";
import firebase from "firebase/app";
import { TextField, Button } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { useAuth } from "../contexts/Authcontext";
import Alert from "@material-ui/lab/Alert";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreatePost() {
  const { currentUser } = useAuth();
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const adminRef = firestore.collection("AdminApproval");
  const [error, setError] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [durstartValue, setDurstartValue] = useState("");
  const [durendValue, setDurendValue] = useState("");
  const [timeStart, setTimeStart] = useState("08:00");
  const [timeEnd, setTimeEnd] = useState("09:00");
  const [skillsValue, setSkillsValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

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
        timestart: timeStart,
        timeend: timeEnd,
        skills: skillsValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        imageURL: currentUser.photoURL,
        description: descriptionValue,
        uid,
      });
    } catch {
      setError("Failed to submit post! Please contact admin");
    }
  };

  return (
    <div className="flex bg-gray-100 shadow-md my-8 mx-32 py-8 px-6 rounded-lg sm:px-10">
      <div>{error && <Alert severity="error">{error}</Alert>}</div>
      <form
        onSubmit={createPost}
        className="flex flex-col mb-0 space-y-8 p-4 space-x-2"
      >
        <label className="block text-sm font-medium text-gray-700">
          {" "}
          Create a New Posting{" "}
        </label>{" "}
        <TextField
          value={titleValue}
          placeholder="Title of Opportunity"
          onChange={(e) => setTitleValue(e.target.value)}
          label="Title"
          variant="outlined"
        />{" "}
        <div className="flex flex-wrap gap-6">
          <div style={{ position: "relative", zIndex: "999" }}>
            <EventIcon
              style={{
                position: "absolute",
                right: 5,
                top: 18,
                width: 20,
                height: 20,
              }}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={durstartValue}
              onChange={(date) => setDurstartValue(date)}
              customInput={<TextField variant="outlined" label="Start Date" />}
            />
          </div>
          <div style={{ position: "relative", zIndex: "998" }}>
            <EventIcon
              style={{
                position: "absolute",
                right: 5,
                top: 18,
                width: 20,
                height: 20,
              }}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={durendValue}
              onChange={(date) => setDurendValue(date)}
              minDate={durstartValue}
              customInput={<TextField variant="outlined" label="End Date" />}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <TextField
            id="time"
            label="Start Time"
            type="time"
            defaultValue="08:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 30 min
            }}
            onChange={(e) => setTimeStart(e.target.value)}
            variant="outlined"
          />
          <TextField
            id="time"
            label="End Time"
            type="time"
            defaultValue="09:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 30 min
            }}
            onChange={(e) => setTimeEnd(e.target.value)}
            variant="outlined"
          />
        </div>
        <TextField
          value={skillsValue}
          id="outlined-basic"
          placeholder="Skills required"
          onChange={(e) => setSkillsValue(e.target.value)}
          label="Skills required"
          variant="outlined"
        />{" "}
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={8}
          variant="outlined"
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={"focus:outline-none"}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
