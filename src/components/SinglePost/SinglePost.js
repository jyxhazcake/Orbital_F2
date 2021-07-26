import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuth } from "../../contexts/Authcontext";
import { TextField, Button, Link } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";

import EventIcon from "@material-ui/icons/Event";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import RoomIcon from "@material-ui/icons/Room";
import FlagIcon from "@material-ui/icons/Flag";

import DisplayStudents from "../DisplayStudents";

function SinglePost(props) {
  const firestore = firebase.firestore();
  const { currentUser } = useAuth();
  const UsersRef = firestore.collection("Users");
  const flagRef = firestore.collection("Flagged");
  const interestsRef = firestore.collection("interests");
  const postID = props.post.id;
  const [interestedStudents] = useDocumentData(
    firestore.collection("interests").doc(props.post.id)
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flagEmail, setFlagEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const {
    createdAt,
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
    target,
    imageURL,
  } = props.post;

  const dateStart = durationstart.toDate();
  const dateEnd = durationend.toDate();

  //modal
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

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

  async function indicateInterest(e) {
    e.preventDefault();

    setError("");

    const docRef = interestsRef.doc(postID);
    const userUID = currentUser.uid;

    try {
      UsersRef.doc(userUID).update({
        interestedPosts: firebase.firestore.FieldValue.arrayUnion(postID),
      });

      docRef.update({
        students: firebase.firestore.FieldValue.arrayUnion(userUID),
      });
    } catch {
      setError("Could not indicate interest");
      console.log(error);
    }

    handleClose();
  }

  async function flagPost(e) {
    e.preventDefault();

    setError("");

    const userUID = currentUser.uid;

    try {
      setLoading(true);
      await flagRef.doc(postID).set({
        feedback: feedback,
        uid,
      });
    } catch {
      setError("Failed to submit feedback! Please contact admin");
    }

    setLoading(false);
    handleFormClose();
  }

  return (
    <div>
      <div className="flex flex-wrap rounded overflow-hidden shadow-sm mx-4 my-10 gap-x-28">
        <div className="flex-shrink lg:w-7/12 md: w-full sm:min-w-max">
          <img
            className="object-contain w-full max-h-screen"
            src={imageURL}
            alt="imagelol"
          />
        </div>
        <div className="flex-1 py-6 p-4">
          <div className="font-bold text-4xl pb-4">
            {capitalizeTheFirstLetterOfEachWord(title)}
          </div>
          <p className="text-gray-700 text-base pb-8">
            by{" "}
            <strong className="text-xl">
              {capitalizeTheFirstLetterOfEachWord(name)}
            </strong>
          </p>
          <div className="pb-4">
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
          <p className="pb-4">
            <AccessTimeIcon /> {timestart ? tConvert(timestart) : "-"} to{" "}
            {timeend ? tConvert(timeend) : "-"}
          </p>
          <div className="flex pb-10 gap-1">
            <RoomIcon />
            <div>
              {capitalizeTheFirstLetterOfEachWord(region)}
              <br></br>
              <p className="text-gray-400">
                {address}
                <br></br>
                Singapore, {postalCode}
              </p>
            </div>
          </div>
          <Divider></Divider>
          <div className="py-10">
            <p className="font-bold text-xl"> Description</p>
            <p> {description} </p>
          </div>
          <div className="pb-10">
            {interestedStudents?.students.some(
              (item) => currentUser?.uid === item
            ) ? (
              <Button
                variant="outlined"
                style={{ outline: "none", borderRadius: 16 }}
                fullWidth
              >
                Application Pending
              </Button>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
                style={{ outline: "none" }}
                onClick={handleOpen}
              >
                Volunteer
              </Button>
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <DialogTitle id="alert-dialog-title">
                {"Volunteer Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You are currently signing up for
                  <br></br>
                  <br></br>
                  <div className="flex flex-col gap-8">
                    <strong className="flex justify-center text-xl">
                      {capitalizeTheFirstLetterOfEachWord(title)}
                    </strong>
                    <p className="flex justify-center">by</p>
                    <p className="flex justify-center gap-1">
                      <strong className="text-xl">
                        {" "}
                        {capitalizeTheFirstLetterOfEachWord(name)}
                      </strong>
                    </p>
                    <p className="flex justify-center">on</p>
                    <p>
                      <strong className="flex justify-center text-xl">
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
                      </strong>
                      <strong className="flex justify-center text-l">
                        {timestart ? tConvert(timestart) : "-"} to{" "}
                        {timeend ? tConvert(timeend) : "-"}
                      </strong>
                    </p>
                    <p className="flex justify-center">at</p>
                    <p>
                      <strong className="flex justify-center text-xl">
                        {address}
                      </strong>
                    </p>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={indicateInterest}
                  variant="contained"
                  color="Primary"
                  style={{ outline: "none" }}
                >
                  Confirm
                </Button>
                <Button
                  onClick={handleClose}
                  color="primary"
                  style={{ outline: "none" }}
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Divider></Divider>
          <div className="flex justify-center p-2">
            <FlagIcon />
            <div>
              <Link
                className="text-base cursor-pointer"
                onClick={handleFormOpen}
              >
                {" "}
                Report Post
              </Link>
              <Dialog
                open={formOpen}
                onClose={handleFormClose}
                aria-labelledby="form-dialog-title"
              >
                {error && <Alert severity="error">{error}</Alert>}
                <DialogTitle id="form-dialog-title">
                  Report Inappropriate Posting
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please fill up the information below and we will proceed
                    with the investigation.
                  </DialogContentText>
                  <TextField
                    id="outlined-multiline-static"
                    required
                    label="Feedback"
                    placeholder="Please provide details of how this post is inappropriate/your negative experience"
                    multiline
                    fullWidth
                    rows={8}
                    variant="outlined"
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                  <Button
                    style={{ outline: "none" }}
                    disabled={loading}
                    onClick={flagPost}
                    color="primary"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      {currentUser ? (
        currentUser.email === "admin@admin.sg" || currentUser.uid === uid ? (
          <div className="ml-20 mb-20">
            <p className="font-bold text-l">Interested Students: </p>
            {interestedStudents?.students &&
              interestedStudents?.students.map((stdent) => (
                <DisplayStudents key={stdent.id} student={stdent} />
              ))}
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default withRouter(SinglePost);
