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
  const [durstartValue, setDurstartValue] = useState(new Date());
  const [durendValue, setDurendValue] = useState("");
  const [timeStart, setTimeStart] = useState("08:00");
  const [timeEnd, setTimeEnd] = useState("09:00");
  const [skillsValue, setSkillsValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [volunteerNo, setVolunteerNo] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [regionValue, setRegionValue] = useState("");
  const [loading, setLoading] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;
    setError("");

    try {
      setLoading(true);
      await adminRef.add({
        name: currentUser.displayName,
        title: titleValue,
        durationstart: durstartValue,
        durationend: durendValue,
        timestart: timeStart,
        timeend: timeEnd,
        skills: skillsValue,
        volunteerNo: volunteerNo,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        imageURL: currentUser.photoURL,
        description: descriptionValue,
        address: addressValue,
        postalCode: postalCodeValue,
        region: regionValue,
        uid,
      });
    } catch {
      setError("Failed to submit post! Please contact admin");
    }

    setLoading(false);
  };

  return (
    <div className="p-5 bg-gray-200">
      <form
        id="createPost"
        onSubmit={createPost}
        className="flex flex-col mb-0 space-y-8 p-4 space-x-2"
      >
        {error && <Alert severity="error">{error}</Alert>}
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
              minDate={new Date()}
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
          id="filled-number"
          required
          label="Number of Volunteers Needed"
          type="number"
          onChange={(e) => setVolunteerNo(e.target.value)}
          variant="outlined"
        />
        <TextField
          value={addressValue}
          required
          id="outlined-basic"
          placeholder="e.g. 21 Lower Kent Ridge Rd"
          onChange={(e) => setAddressValue(e.target.value)}
          label="Address"
          variant="outlined"
        />
        <TextField
          value={postalCodeValue}
          required
          id="outlined-basic"
          placeholder="e.g. S119077"
          onChange={(e) => setPostalCodeValue(e.target.value)}
          label="Postal Code"
          variant="outlined"
        />
        <TextField
          value={regionValue}
          required
          id="outlined-basic"
          placeholder="e.g. Clementi"
          onChange={(e) => setRegionValue(e.target.value)}
          label="Region"
          variant="outlined"
        />
        <TextField
          value={skillsValue}
          required
          id="outlined-basic"
          placeholder="Skills required"
          onChange={(e) => setSkillsValue(e.target.value)}
          label="Skills required"
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          required
          label="Description"
          placeholder="Please include at least
          2-3 lines to explain what volunteers may expect."
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
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
