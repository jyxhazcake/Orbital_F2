import React from "react";
import { useState } from "react";
import firebase from "firebase/app";
import { TextField, Button } from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import storage from 'firebase/storage';

export default function CreatePost() {
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const adminRef = firestore.collection("AdminApproval");
  const [error, setError] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [durstartValue, setDurstartValue] = useState("");
  const [durendValue, setDurendValue] = useState("");
  const [skillsValue, setSkillsValue] = useState("");
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;
    setError("");

    try {
      await adminRef.add({
        name: nameValue,
        title: titleValue,
        durationstart: durstartValue,
        durationend: durendValue,
        skills: skillsValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
          Your Information{" "}
        </label>
        <TextField
          value={nameValue}
          placeholder="Name"
          onChange={(e) => setNameValue(e.target.value)}
        />{" "}
            <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
              <div className="upload__image-wrapper">
              {imageList.map((image, index) => (
                <div key={index} className="my-4">
                  console.log(image.data_url)
                  <img
                    src={image.data_url}
                    alt=""
                    width="200"
                    className="mb-2 border-2 cursor-pointer"
                    onClick={() => onImageUpdate(index)} />
                <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className=""
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </Button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </Button>
                </div>
              </div>
            ))}
            <Button variant="contained" color="primary"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            &nbsp;
            <Button variant="contained" color="primary" onClick={onImageRemoveAll}>Remove all images</Button>
          </div>
        )}
      </ImageUploading>
    </div>
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
