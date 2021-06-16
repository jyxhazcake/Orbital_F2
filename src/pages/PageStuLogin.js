import StuLogin from "../components/StuLogin";
import logo from "../components/img/NVJBlogo.png"
import utown from "../components/img/utown.png";
import { Link } from 'react-router-dom';

const background = {
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${utown})`,
  backgroundSize: 'cover',
};

const PageStuLogin = () => {
  return (
    <div style = { background }>
      <div align="center" margin = "50px">
        <Link to='/'>
          <img src={ logo } alt='NVJBlogo'></img>
        </Link>
        <h1>This is the Student Login page!</h1>
        <StuLogin />
      </div>
    </div>
  );
};

export default PageStuLogin;
