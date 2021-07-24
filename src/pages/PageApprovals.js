import React from "react";
import firebase from "firebase/app";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import AppShell from "../components/AppShell";
import PostAdmin from "../components/PostAdmin";
import AccApproval from "../components/AccApproval";
import { useAuth } from "../contexts/Authcontext";
import { Redirect } from "react-router";

export default function PageApprovals() {
  const firestore = firebase.firestore();
  const { currentUser } = useAuth();
  const userRef = firestore.collection("Users").doc(currentUser?.uid);

  const [user] = useDocumentData(userRef);
  const [admin] = useCollectionData(firestore.collection("AdminApproval"), {
    idField: "id",
  });
  const [accreq] = useCollectionData(firestore.collection("AccountRequest"), {
    idField: "id",
  });

  if (user?.Class !== "admin") {
    <Redirect to="/unauthorized" />;
  }

  return (
    <>
      <AppShell />
      <div className="p-6 text-l font-bold ">Post Requests:</div>
      {admin && admin.map((adm) => <PostAdmin key={adm.id} post={adm} />)}
      <div className="p-6 text-l font-bold">Account Requests:</div>
      {accreq && accreq.map((req) => <AccApproval key={req.id} post={req} />)}
      <div className="p-6 text-l font-bold">Flag Requests:</div>
    </>
  );
}
