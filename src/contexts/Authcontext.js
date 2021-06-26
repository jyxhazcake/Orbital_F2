import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { firebase } from "@firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  
  function signup(email, password) {
    const db = firebase.firestore();
    return (
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection('Users').doc(cred.user.uid).set({
          Class: "student"
        })
      })
    );
  }

  function recruiterSignup(email, password, organisationName, id, contactName, organisationMobile, contactMobile) {
    const db = firebase.firestore();
    return (
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection('Users').doc(cred.user.uid).set({
          Organisation: organisationName,
          UEM_SRN: id,
          Contact: contactName,
          OrganisationMobile: organisationMobile,
          ContactMobile: contactMobile,
          Class: "recruiter"
        })
        cred.user.updateProfile({
          displayName: organisationName
        })
      })
    );
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

  function updateEmail(email) {
    return currentUser.updateEmail(email);
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
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
