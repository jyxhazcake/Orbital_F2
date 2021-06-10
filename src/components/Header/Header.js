import { Button } from "@material-ui/core";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Welcome! Please choose your role.</h1>
      </header>
      <p className={styles.header}>
        <div className="buttondiv">
          <Button variant="contained" color="primary" type="submit">
            Post a Job
          </Button>
        </div>
        <div className="buttondiv">
          <Button variant="contained" color="secondary" type="submit">
            Find a Job
          </Button>
        </div>
      </p>
    </>
  );
};

export default Header;
