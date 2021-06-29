import handhold from "../components/img/handhold.png";
import sneaky from "../components/img/sneaky.png";
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
      <div className="bg-gray-200">
        <img src={handhold} className="w-screen w-full flex" alt="handhold" />
        {currentUser ?
          <div className="flex grid gap-5 m-5">
            <span className="font-bold text-xl justify-center"> Latest Post</span>
            <div className="pb-20">
              {posts &&
                posts.map((pst) => <PostContent key={pst.id} post={pst} />)}
            </div>
          </div> :
          <div className="flex justify-center mx-auto py-24">
            <img className="w-10" src={sneaky} alt="sneaky" /> &nbsp; &nbsp;
            <p className="text-xl font-bold">
            Login to see our latest posts
            </p>
          </div>}
      </div>
    </div>
  );
}

export default PageHome;
