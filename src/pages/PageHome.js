import handhold from "../components/img/handhold.png";
import pic1 from "../components/img/pic1.jpg";
import pic2 from "../components/img/pic2.jpg";
import pic3 from "../components/img/pic3.jpg";
import pic4 from "../components/img/pic4.jpg";
import pic5 from "../components/img/pic5.jpg";
import pic6 from "../components/img/pic6.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import AppShell from "../components/AppShell";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PostContent from "../components/PostContent";
import { useAuth } from "../contexts/Authcontext";
import { Carousel } from "react-responsive-carousel";

function PageHome() {
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");

  const query = postsRef.orderBy("createdAt", "desc").limit(3);
  const [posts] = useCollectionData(query, { idField: "id" });

  const images = [
    {
      original: pic1,
    },
  ];

  return (
    <div>
      <AppShell />
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
      >
        <div>
          <img src={pic4} alt="" />
          <p className="legend font-bold">
            Students discussing plans before engaging in activity
          </p>
        </div>

        <div>
          <img src={pic2} alt="" />
          <p className="legend font-bold">
            Students enjoying themselves at an NUS Computing volunteering event
          </p>
        </div>
        <div>
          <img src={pic3} alt="" />
          <p className="legend font-bold">This boy enjoying himself</p>
        </div>
        <div>
          <img src={pic1} alt="" />
          <p className="legend font-bold">
            Wait are these even volunteer photos I'm confused
          </p>
        </div>
        <div>
          <img src={pic6} alt="" />
          <p className="legend font-bold">Meeting</p>
        </div>
      </Carousel>
    </div>
  );
}

export default PageHome;
