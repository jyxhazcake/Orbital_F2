import handhold from "../components/img/handhold.png";
import pic1 from "../components/img/pic1.jpg";
import pic2 from "../components/img/pic2.jpg";
import AppShell from "../components/AppShell";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PostContent from "../components/PostContent";
import { useAuth } from "../contexts/Authcontext";
import ImageGallery from "react-image-gallery";

function PageHome() {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");

  const query = postsRef.orderBy("createdAt", "desc").limit(1);
  const [posts] = useCollectionData(query, { idField: "id" });

  const images = [
    {
      original: pic1,
    },
  ];

  return (
    <div>
      <AppShell />
      <div className="bg-gray-200">
        {/*<img src={pic1} className="w-screen w-full flex" alt="handhold" />*/}
        <ImageGallery items={images} />
        <div className="flex grid gap-5 m-5">
          <span className="flex justify-center font-bold text-xl ">
            {" "}
            Latest Posts{" "}
          </span>
          <div className="flex justify-center pb-20">
            {posts &&
              posts.map((pst) => <PostContent key={pst.id} post={pst} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHome;
