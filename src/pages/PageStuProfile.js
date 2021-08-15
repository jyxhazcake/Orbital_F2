import React from "react";
import AppShell from "../components/AppShell/AppShellNo";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import StuProfile from "../components/Profile/StuProfile";

function PageStuProfile(props) {
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
          .map((pst) => <StuProfile key={pst.id} post={pst} />)}
    </div>
  );
}

export default PageStuProfile;
