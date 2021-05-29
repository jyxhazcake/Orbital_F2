import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

import Header from "../components/Header/";
import PostBoard from "../components/PostBoard"

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
        <Header />
        <PostBoard tasks={tasks} setTasks={setTasks}/>
        </>
    );
}

export default PagePosting