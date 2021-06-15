import StuLogin from "../components/StuLogin";
import utown from "../components/img/utown.png";

const PageStuLogin = () => {
  return (
    <div>
      <img src={utown} alt="utown" />
      <h1>This is the Student Login page!</h1>
      <StuLogin />
    </div>
  );
};

export default PageStuLogin;
