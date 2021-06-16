//import RecruiterLogin from "../components/RecruiterLogin";
import logo from "../components/img/NVJBlogo.png"
import kids from "../components/img/kids.png";
import { Link } from 'react-router-dom';

const background = {
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${kids})`,
  backgroundSize: 'cover',
};

function RecruiterLogin() {
  return (
    <div style = { background }>
      <div align="center" margin = "50px">
        <Link to='/'>
          <img src={ logo } alt='NVJBlogo'></img>
        </Link>
        <h1>Recruiter Login Page</h1>
      </div>
    </div>
  );
};

export default RecruiterLogin;