import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AppShellOpp from "../components/AppShell/AppShellOpp";
import PostContent from "../components/Post/PostContent";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

function PagePosting() {
  const firestore = firebase.firestore();
  const [searchTerm, setSearchTerm] = useState("");

  const postsRef = firestore.collection("posts");
  const postquery = postsRef.orderBy("createdAt", "desc").limit(25);

  const [posts] = useCollectionData(postquery, { idField: "id" });

  return (
    <>
      <AppShellOpp />
      <div className="bg-white h-screen">
        <div className="p-8">
          <div className="bg-gray-200 flex items-center rounded-full">
            <SearchIcon className="ml-4" />
            <input
              className="bg-gray-200 rounded-full w-full py-4 px-2 text-gray-800 leading-tight focus:outline-none"
              id="search"
              type="text"
              placeholder="Filter posts (e.g. 'Jurong East', 'Singapore Children's Society')"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>

        <p className="pl-10 font-bold text-base text-gray-900">
          Opportunities Available
        </p>
        <div className="flex flex-wrap gap-x-10 pt-5 pl-10 items-center">
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
    </>
  );
}

export default PagePosting;
