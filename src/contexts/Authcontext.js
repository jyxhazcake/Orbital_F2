import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { firebase } from "@firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const db = firebase.firestore();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, name, contactMobile) {
    //const db = firebase.firestore();
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      db.collection("Users").doc(cred.user.uid).set({
        Class: "student",
        Name: name,
        ContactMobile: contactMobile,
        Email: email,
      });
      cred.user.updateProfile({
        displayName: name,
      });
    });
  }

  function recruiterSignup(
    email,
    password,
    organisationName,
    id,
    contactName,
    organisationMobile,
    contactMobile
  ) {
    //const db = firebase.firestore();
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      db.collection("Users").doc(cred.user.uid).set({
        Organisation: organisationName,
        UEM_SRN: id,
        Contact: contactName,
        OrganisationMobile: organisationMobile,
        ContactMobile: contactMobile,
        Class: "recruiter",
        Email: email,
      });
      cred.user.updateProfile({
        displayName: organisationName,
      });
    });
  }

  function adminAssistSignUp(
    email,
    password,
    organisationName,
    contactName,
    organisationMobile,
    contactMobile
  ) {
    //const db = firebase.firestore();
    return db.collection("AccountRequest").add({
      Organisation: organisationName,
      Contact: contactName,
      OrganisationMobile: organisationMobile,
      ContactMobile: contactMobile,
      Class: "recruiter",
      Email: email,
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(eml) {
    return currentUser.updateEmail(eml).then(() => {
      db.collection("Users").doc(currentUser.uid).update({
        Email: eml,
      });
    });
  }

  function updateName(name) {
    return currentUser.updateProfile({ displayName: name }).then(() => {
      db.collection("Users").doc(currentUser.uid).update({
        Name: name,
      });
    });
  }

  function updateOrgName(name) {
    return currentUser.updateProfile({ displayName: name }).then(() => {
      db.collection("Users").doc(currentUser.uid).update({
        Organisation: name,
      });
    });
  }

  async function updateMobile(number) {
    return await db.collection("Users").doc(currentUser.uid).update({
      ContactMobile: number,
    });
  }
  async function updateContactName(name) {
    return await db.collection("Users").doc(currentUser.uid).update({
      Contact: name,
    });
  }
  async function updateOrgMobile(number) {
    return await db.collection("Users").doc(currentUser.uid).update({
      OrganisationMobile: number,
    });
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    recruiterSignup,
    adminAssistSignUp,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateName,
    updateMobile,
    updateContactName,
    updateOrgMobile,
    updateOrgName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
