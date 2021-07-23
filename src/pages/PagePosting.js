import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
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
      <div className="bg-gray-100 p-5">
        <div class="p-8">
          <div class="bg-white flex items-center rounded-full shadow-xl">
            <input
              class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="text"
              placeholder="Search for opportunities here"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            <div class="p-4">
              <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                {" "}
                icon{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="block text-sm font-medium text-gray-700 bg-gray-400 shadow-md my-4 p-6 lg:mx-56 md:mx-24 sm:mx-0 rounded">
          <p className="text-xl"> Opportunities Available </p>
          <div className="flex flex-wrap gap-x-6 p-4">
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
