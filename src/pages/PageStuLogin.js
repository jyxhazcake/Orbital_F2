import StuLogin from "../components/LoginSignup/StuLogin";
import utown from "../components/img/utown.png";

const background = {
  backgroundImage: `url(${utown})`,
  position: "fixed",
  top: 0,
  left: 0,
  minWidth: "100%",
  minHeight: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const PageStuLogin = () => {
  return (
    <div style={background}>
      <StuLogin />
    </div>
  );
};

export default PageStuLogin;
