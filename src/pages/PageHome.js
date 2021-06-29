import handhold from "../components/img/handhold.png";
import AppShell from "../components/AppShell";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PostContent from "../components/PostContent";
import { useAuth } from "../contexts/Authcontext";

function PageHome() {
  const { currentUser } = useAuth();
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");

  const query = postsRef.orderBy("createdAt", "desc").limit(1);
  const [posts] = useCollectionData(query, { idField: "id" });

  return (
    <div>
      <AppShell />
      <div className="bg-red-100">
        <img src={handhold} className="w-screen w-full flex" alt="handhold" />
        {currentUser ?
          <div className="flex grid gap-5 m-5">
            <span className="font-bold text-xl justify-center"> Latest Post</span>
            <div className="pb-20">
              {posts &&
                posts.map((pst) => <PostContent key={pst.id} post={pst} />)}
            </div>
          </div> : <></>}
      </div>
    </div>
  );
}

export default PageHome;
