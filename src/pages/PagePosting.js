import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import CreatePost from "../components/CreatePost";
import AppShell from "../components/AppShell";
import PostContent from "../components/PostContent";
import PostAdmin from "../components/PostAdmin";
import { useAuth } from "../contexts/Authcontext";

const firestore = firebase.firestore();

function PagePosting() {
  const { currentUser } = useAuth();

  const postsRef = firestore.collection("posts");
  const postquery = postsRef.orderBy("createdAt", "desc").limit(25);

  const adminRef = firestore.collection("AdminApproval");
  const adminquery = adminRef.orderBy("createdAt", "desc").limit(25);

  const userRef = firestore.collection("Users").doc(currentUser.uid);

  const [posts] = useCollectionData(postquery, { idField: "id" });
  const [admin] = useCollectionData(adminquery, { idField: "id" });
  const [user] = useDocumentData(userRef);

  return (
    <>
      <AppShell />
      <div className="bg-gray-300 grid gap-1">
        {currentUser.email === "admin@admin.sg" &&
          admin &&
          admin.map((adm) => <PostAdmin key={adm.id} post={adm} />)}
        {user?.Class === "recruiter" && <CreatePost />}
        {posts &&
          posts.map((pst) => <PostContent key={pst.id} post={pst} />)}{" "}
      </div>
    </>
  );
}

export default PagePosting;
