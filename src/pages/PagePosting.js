import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import AppShellOpp from "../components/AppShellOpp";
import PostContent from "../components/PostContent";
import PostAdmin from "../components/PostAdmin";
import { useAuth } from "../contexts/Authcontext";
import { ListItemAvatar, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "full",
    height: 50,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    marginLeft: 10,
  },
}));

function PagePosting() {
  const firestore = firebase.firestore();
  const classes = useStyles();
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
      <AppShellOpp />
      <div className="bg-gray-1 00 p-5">
        <div class="p-8">
          <div class="bg-white flex items-center rounded-full">
            <SearchIcon className="ml-4" />
            <input
              class="rounded-full w-full py-4 px-2 text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="text"
              placeholder="Search for opportunities here"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="block text-sm font-medium text-gray-700 bg-gray-400 shadow-md my-4 p-6 lg:mx-40 md:mx-24 sm:mx-0 rounded">
          <p className="text-xl"> Opportunities Available </p>
          <div className="flex flex-wrap gap-x-6 p-6">
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
                  }
                })
                .map((pst) => <PostContent key={pst.id} post={pst} />)}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default PagePosting;
