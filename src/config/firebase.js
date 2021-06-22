/*export const config = {
    apiKey: "AIzaSyAkMgydviUEF-Es3xqPqWWtOR6HXYWylQA",
    authDomain: "f2-orbital-dcddf.firebaseapp.com",
    projectId: "f2-orbital-dcddf",
    storageBucket: "f2-orbital-dcddf.appspot.com",
    messagingSenderId: "1081379865355",
    appId: "1:1081379865355:web:20bb566cfc911d1e6b980e",
    measurementId: "G-E1097VYZY4"
};*/
  

import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.envREACT_APP_FIREBASE_MEASUREMENT_ID
})

export const auth = app.auth()
export default app