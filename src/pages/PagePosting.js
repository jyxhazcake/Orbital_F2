import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

import PostBoard from "../components/PostBoard";
import AppShell from "../components/AppShell";
import PostContent from "../components/PostContent";


/*    db.collection('posts').get().then((snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data())
      })
    })) */

function PagePosting() {
  // Task state has to be lifted to be at the App level
  // because Header also needs to know the task state to display
  // no. of undone tasks. It cannot be contained within TaskManager
  // as child components cannot pass props to their parent components.
  const [tasks, setTasksState] = useState([]);

  function setTasks(newTasks) {
    setTasksState(newTasks);
  }

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/posts").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setTasksState(doc.data().posts);
      } else {
        setTasksState([]);
      }
    });
  }, []);

  return (
    <>
      <AppShell />
      <PostContent />
      <PostBoard tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default PagePosting;
