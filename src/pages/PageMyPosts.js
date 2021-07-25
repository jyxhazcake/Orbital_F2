import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import AppShell from "../components/AppShell3rd";
import PostContent from "../components/PostContent";
import { useAuth } from "../contexts/Authcontext";
import { ListItemAvatar, TextField } from "@material-ui/core";
import PendingPosts from "../components/PendingPosts";
import CreatePost from "../components/CreatePost";
import { Link } from "react-router-dom";

const firestore = firebase.firestore();

function PagePosting() {
  const { currentUser } = useAuth();

  const postsRef = firestore.collection("posts");
  const postquery = postsRef.orderBy("createdAt", "desc").limit(25);

  const adminRef = firestore.collection("AdminApproval");
  const adminquery = adminRef.orderBy("createdAt", "desc").limit(25);

  const userRef = firestore.collection("Users").doc(currentUser?.uid);

  const [posts] = useCollectionData(postquery, { idField: "id" });
  const [pending] = useCollectionData(adminquery, { idField: "id" });
  const [user] = useDocumentData(userRef);

  const [myposts] = useCollectionData(adminquery, { idField: "id" })?.filter(
    (pst) => {
      return currentUser.uid === pst?.uid;
    }
  );

  return (
    <>
      <AppShell />
      {user?.Class === "recruiter" && <CreatePost />}
      <div className="bg-gray-700 p-5">
        <div className="block text-sm font-medium text-gray-700 bg-gray-300 shadow-md my-4 p-6 lg:mx-56 md:mx-24 sm:mx-0 rounded">
          <p className="text-xl"> Pending Postings </p>
          <div className="grid grid-cols-3 gap-2 p-4">
            {pending &&
              pending
                .filter((pst) => {
                  return pst.uid === currentUser.uid;
                })
                .map((pdg) => <PendingPosts key={pdg.id} post={pdg} />)}
          </div>
        </div>
        <div className="block text-sm font-medium text-gray-700 bg-gray-400 shadow-md my-4 p-6 lg:mx-56 md:mx-24 sm:mx-0 rounded">
          <p className="text-xl"> Current Postings </p>
          <div className="grid grid-cols-3 gap-2 p-4">
            {posts &&
              posts
                .filter((pst) => {
                  return pst.uid === currentUser.uid;
                })
                .map((pst) => (
                  <Link to={"/opportunities/" + pst.id}>
                    <PostContent key={pst.id} post={pst} />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PagePosting;
