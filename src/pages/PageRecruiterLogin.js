import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/Authcontext";
import { TextField, Grid, Paper, Button, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Link as RouterLink, useHistory } from "react-router-dom";
import logo from "../components/img/NVJBlogo.png";
import kids from "../components/img/kids.png";

const paperStyle = {
  padding: 20,
  minHeight: "70px",
  width: 300,
  margin: "30px auto",
};

const background = {
  backgroundImage: `url(${kids})`,
  position: "fixed",
  top: 0,
  left: 0,
  minWidth: "100%",
  minHeight: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const logoStyle = {
  height: 100,
  width: 90,
};

const buttonStyle = {
  margin: "8px 0",
};

const RecruiterLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <Grid style={background}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <RouterLink to="/">
            <img src={logo} alt="NVJBlogo" style={logoStyle}></img>
          </RouterLink>
          <p class="text-xl font-bold">Sign in</p>
          {error && <Alert severity="error">{error}</Alert>}
        </Grid>
        <TextField
          label="Organisation Email"
          placeholder="Enter Email Address"
          fullWidth
          required
          inputRef={emailRef}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          placeholder="Enter password"
          type="password"
          autoComplete="current-password"
          fullWidth
          required
          inputRef={passwordRef}
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              name="checkedI"
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={buttonStyle}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Link component={RouterLink} to="/forgotpassword">
          Forgot Password?
        </Link>
        <p class="text-center mt-6">
          {" "}
          Do not have an account?
          <Link component={RouterLink} to="/recruitersignup">
            {" "}
            Sign Up.
          </Link>
        </p>
        <p class="text-center mt-2">
          {" "}
          Not an Organisation?
          <Link component={RouterLink} to="/studentlogin">
            {" "}
            Student Sign In here.
          </Link>
        </p>
      </Paper>
    </Grid>
  );
};

export default RecruiterLogin;
