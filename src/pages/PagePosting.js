import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CreatePost from "../components/CreatePost";
import AppShell from "../components/AppShell";
import PostContent from "../components/PostContent";

const firestore = firebase.firestore();

function PagePosting() {
  const postsRef = firestore.collection("posts");
  const query = postsRef.orderBy("createdAt").limit(25);

  const [posts] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <AppShell />
      <CreatePost />
      {posts && posts.map((pst) => <PostContent key={pst.id} post={pst} />)}
    </>
  );
}

export default PagePosting;
