import handhold from "../components/img/handhold.png";
import AppShell from "../components/AppShell";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PostContent from "../components/PostContent";

function PageHome() {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");

  const query = postsRef.orderBy("createdAt", "desc").limit(1);
  const [posts] = useCollectionData(query, { idField: "id" });

  return (
    <div>
      <AppShell />
      <div className="flex grid gap-10 m-10">
        <img src={handhold} className="object-contain" alt="handhold" />
        <div className="font-bold text-xl"> Latest Post</div>
        {posts && posts.map((pst) => <PostContent key={pst.id} post={pst} />)}
      </div>
    </div>
  );
}

export default PageHome;
