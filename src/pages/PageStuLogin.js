import StuLogin from "../components/StuLogin";
import utown from "../components/img/utown.png";
import { Link } from 'react-router-dom';

const background = {
  backgroundImage: `url(${utown})`,
  position: 'fixed',
  top: 0,
  left: 0,
  minWidth: '100%',
  minHeight: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};


const PageStuLogin = () => {
  return (
    <div style = { background }>
        <StuLogin />
    </div>
  );
};

export default PageStuLogin;
