import React from "react";
import AppShell from "../components/AppShell/AppShellOpp";
import SinglePost from "../components/Post/SinglePost";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function PageSinglePost(props) {
  const firestore = firebase.firestore();

  const postquery = firestore.collection("posts");
  const [posts] = useCollectionData(postquery, { idField: "id" });
  return (
    <div>
      <AppShell />
      {posts &&
        posts
          .filter((pst) => {
            return props.match.params.id === pst.id;
          })
          .map((pst) => <SinglePost key={pst.id} post={pst} />)}
    </div>
  );
}
