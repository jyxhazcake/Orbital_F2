import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import CreatePost from "../components/CreatePost";
import AppShell from "../components/AppShell";
import PostContent from "../components/PostContent";
import PostAdmin from "../components/PostAdmin";
import { useAuth } from "../contexts/Authcontext";
import { ListItemAvatar, TextField } from "@material-ui/core";

const firestore = firebase.firestore();

function PagePosting() {
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser } = useAuth();

  const postsRef = firestore.collection("posts");
  const postquery = postsRef.orderBy("createdAt", "desc").limit(25);

  const adminRef = firestore.collection("AdminApproval");
  const adminquery = adminRef.orderBy("createdAt", "desc").limit(25);

  const userRef = firestore.collection("Users").doc(currentUser?.uid);

  const [posts] = useCollectionData(postquery, { idField: "id" });
  const [admin] = useCollectionData(adminquery, { idField: "id" });
  const [user] = useDocumentData(userRef);

  return (
    <>
      <AppShell />
      <div className="bg-red-100 p-5">
        {currentUser.email === "admin@admin.sg" &&
          admin &&
          admin.map((adm) => <PostAdmin key={adm.id} post={adm} />)}
        {user?.Class === "recruiter" && <CreatePost />}
        <div className="lg:ml-60 md:ml-28 sm:ml-4">
          <TextField
            type="search"
            label="Search"
            variant="standard"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="block text-sm font-medium text-gray-700 bg-red-300 shadow-md my-4 p-6 lg:mx-56 md:mx-24 sm:mx-0 rounded grid gap-1">
          <p className="text-xl"> Opportunities Available </p>
          {posts &&
            posts
              .filter((pst) => {
                for (const property in pst) {
                  if (
                    String(pst[property])
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return pst;
                  }
                  else {
                    return null;
                  }
                }
              })
              .map((pst) => <PostContent key={pst.id} post={pst} />)}{" "}
        </div>
      </div>
    </>
  );
}

export default PagePosting;
