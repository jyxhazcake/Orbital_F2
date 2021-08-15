import React from "react";
import AppShell from "../components/AppShell/AppShellNo";
import OrgProfile from "../components/Profile/OrgProfile";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function PageOrgProfile(props) {
  const firestore = firebase.firestore();
  const userquery = firestore.collection("Users");
  const [user] = useCollectionData(userquery, { idField: "id" });

  return (
    <div>
      <AppShell />
      {user &&
        user
          .filter((usr) => {
            return props.match.params.id === usr.id;
          })
          .map((pst) => <OrgProfile key={pst.id} post={pst} />)}
    </div>
  );
}
