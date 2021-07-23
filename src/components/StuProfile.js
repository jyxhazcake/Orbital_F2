import React, { useState } from "react";
import { useAuth } from "../contexts/Authcontext";
import { Button } from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import firebase from "firebase/app";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { withRouter } from "react-router-dom";

function StuProfile(props) {
  const firestore = firebase.firestore();
  const [images, setImages] = React.useState([]);
  const { currentUser, updateMobile, updateName, updateEmail, updatePassword } =
    useAuth();
  const userRef = firestore.collection("Users").doc(currentUser.uid);
  const [user] = useDocumentData(userRef);
  const [curremail, setCurremail] = useState("");
  const [currpass, setCurrpass] = useState("");
  const [passconf, setPassconf] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("************");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState(currentUser.displayName);
  const [error, setError] = useState("");

  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const imageRef = firebase
    .storage()
    .ref("images/" + currentUser.uid + "/avatar.jpg");

  const updatePhoto = async (e) => {
    await imageRef.putString(images[0].data_url, "data_url");
    imageRef.getDownloadURL().then(async (url) => {
      await currentUser.updateProfile({
        photoURL: url,
      });
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== "************" || email !== currentUser.email) {
      if (password !== passconf) {
        return setError("Passwords do not match!");
      }
      if (password.length < 8) {
        return setError("Password must be minimum 8 characters!");
      }
    }
    try {
      setError("");
      //setLoading(true);
      if (mobile !== "") {
        await updateMobile(
          //emailRef.current.value,
          //passwordRef.current.value,
          //nameRef.current.value
          mobile
          //history.push("/");
        );
      }

      if (name !== currentUser.displayName) {
        await updateName(name);
      }
      if (email !== currentUser.email) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          curremail,
          currpass
        );
        await currentUser.reauthenticateWithCredential(credential);
        await updateEmail(email);
      }
      if (password !== "************") {
        const credential = firebase.auth.EmailAuthProvider.credential(
          curremail,
          currpass
        );
        await currentUser.reauthenticateWithCredential(credential);
        await updatePassword(password);
      }
      if (images !== []) {
        await updatePhoto();
      }
      window.location.reload();
    } catch {
      setError(
        "Failed to update profile! Please check your current information."
      );
    }

    //setLoading(false);
  }

  return (
    <div>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        src={currentUser.photoURL}
                        alt="no display"
                        style={{ maxWidth: "150px" }}
                        className="p-2shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-0 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-0 mt-32 sm:mt-0">
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
                                    Change
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
                              <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                Change Avatar
                              </button>
                            </div>
                          </div>
                        )}
                      </ImageUploading>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6 pt-5">
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-full-name"
                    >
                      Edit Full Name
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-full-name"
                      type="text"
                      placeholder={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-mobile"
                    >
                      Edit Mobile No.
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-mobile"
                      type="text"
                      placeholder={user?.ContactMobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6 pt-10">
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <p class="text-gray-600 text-xs italic">
                      For changing email and password, please re-enter your
                      current information.
                    </p>
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-4"
                      for="grid-email"
                    >
                      Enter Current Email
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="text"
                      placeholder={email}
                      onChange={(e) => setCurremail(e.target.value)}
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Enter Current Password
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      placeholder={"**********"}
                      onChange={(e) => setCurrpass(e.target.value)}
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6 pt-10">
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-email"
                    >
                      Enter New Email
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="text"
                      //placeholder="Enter New Email here"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6 pt-4">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Enter New Password
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      //placeholder={"**********"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p class="text-gray-600 text-xs italic">
                      Min. 8 characters
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Confirm New Password
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      //placeholder={"**********"}
                      onChange={(e) => setPassconf(e.target.value)}
                    />
                    <div className="text-red-600 text-xs italic">{error}</div>
                  </div>
                </div>
                <div className="w-full px-0 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-1 px-0 mt-10 sm:mt-0">
                    <button
                      className="bg-blue-800 active:bg-blue-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleSubmit}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    Sample Text
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default withRouter(StuProfile);
