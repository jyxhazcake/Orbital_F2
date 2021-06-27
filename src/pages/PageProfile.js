import React from "react";
import AppShell from "../components/AppShell";
import { useAuth } from "../contexts/Authcontext";
import { Button } from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import firebase from "firebase/app";

export default function PageProfile() {
  const [images, setImages] = React.useState([]);
  const { currentUser } = useAuth();
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const imageRef = firebase
    .storage()
    .ref("images/" + currentUser.uid + "/avatar.jpg");

  const updatePhoto = () => {
    imageRef.putString(images[0].data_url, "data_url");
    imageRef.getDownloadURL().then((url) => {
      currentUser.updateProfile({
        photoURL: url,
      });
    });
    console.log(currentUser.photoURL);
  };
  return (
    <div>
      <AppShell />
      <div className="p-4 space-y-4">
        <span className="font-bold text-l">Current Photo:</span>
        <img
          src={currentUser.photoURL}
          alt="no image"
          width="200"
          height="100"
          className="p-2"
        />
        <span className="font-bold text-l">Upload Logo/ Profile Image</span>
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
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              {imageList.map((image, index) => (
                <div key={index} className="my-4">
                  <img
                    src={image.data_url}
                    alt=""
                    width="200"
                    height="100"
                    className="mb-2 border-2 cursor-pointer"
                    onClick={() => onImageUpdate(index)}
                  />
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
              <div className="space-x-4">
                <Button
                  variant="outlined"
                  color="primary"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </Button>
              </div>
            </div>
          )}
        </ImageUploading>{" "}
        <Button variant="contained" color="primary" onClick={updatePhoto}>
          {" "}
          Confirm{" "}
        </Button>
      </div>
    </div>
  );
}
