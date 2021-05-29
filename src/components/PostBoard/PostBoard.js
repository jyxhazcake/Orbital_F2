import React, { useEffect, useState } from "react";
import { Button, TextField, Checkbox } from "@material-ui/core";
import { firebase } from "@firebase/app";

import Box from "../Box";

import styles from "./PostBoard.module.css";

function PostBoard(props) {
  // Our tasks and setTasks is now passed down from App
  const { tasks, setTasks } = props;

  const [newTaskText, setNewTaskText] = useState("");

  function handleAddTask(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addTask(newTaskText, firebase);
  }

  function addTask(description) {
    const newTasks = [
      // the ... operator is called the spread operator
      // what we are doing is creating a brand new array of
      // tasks, that is different from the previous array
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      ...tasks,
      {
        description: description,
      }
    ];
    setTasks(newTasks);
  }

  // Hook to watch for any changes in tasks. If there are changes,
  // an update to our Firestore database will be dispatched
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/posts").doc(uid).set({ posts: tasks });
  }, [tasks]);

  return (
    <>
      <Box>
        <h2>Add a Post</h2>
        <form className={styles.addTaskForm} onSubmit={handleAddTask}>
          <TextField
            className={styles.descTextField}
            label="Description"
            value={newTaskText}
            onChange={(event) => {
              setNewTaskText(event.target.value);
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </form>
      </Box>

      <Box>
        <h2>Post Board</h2>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} setTasks={setTasks} />
        ) : (
          <p>No posts yet!</p>
        )}
      </Box>
    </>
  );
}

function TaskList(props) {
  const { tasks, setTasks } = props;

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      // Once again, this is the spread operator
      ...tasks.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
      },
      ...tasks.slice(toToggleTaskIndex + 1)
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setTasks(newTasks);
  }

  return (
    <table style={{ margin: "0 auto", width: "100%" }}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Post</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          // We should specify key here to help react identify
          // what has updated
          // https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{task.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default PostBoard;