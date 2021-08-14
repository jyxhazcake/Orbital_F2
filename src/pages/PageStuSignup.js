import React, { useRef, useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Button,
  Link,
  FormGroup,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink, useHistory } from "react-router-dom";
import logo from "../components/img/NVJBlogo.png";
import utown from "../components/img/utown.png";
import { useAuth } from "../contexts/Authcontext";

const paperStyle = {
  padding: "20px",
  width: 300,
  margin: "30px auto",
};

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

const logoStyle = {
  height: 100,
  width: 90,
};

const buttonStyle = {
  marginTop: "20px",
  marginBottom: "5px",
};

const bottomStyle = {
  margin: "30px auto",
  width: 300,
};

export default function PageStuSignUp() {
  const emailRef = useRef();
  const nameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length < 8) {
      return setError("Passwords have to be greater than 8 characters!");
    }

    if (!emailRef.current.value.includes("@u.nus.edu")) {
      return setError("Email has to be an NUS email!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        mobileRef.current.value
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <Grid style={background}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <RouterLink to="/">
            <img src={logo} alt="NVJBlogo" style={logoStyle}></img>
          </RouterLink>
          <p className="text-xl font-bold">Sign up</p>
          <div>{error && <Alert severity="error">{error}</Alert>}</div>
        </Grid>
        <FormGroup>
          <TextField
            label="NUS Email"
            placeholder="Enter NUS Email Address"
            fullWidth
            required
            inputRef={emailRef}
          />
          <TextField
            label="Name"
            placeholder="Name"
            fullWidth
            required
            inputRef={nameRef}
          />
          <TextField
            label="Mobile Number"
            placeholder="Enter mobile number"
            fullWidth
            required
            inputRef={mobileRef}
          />
          <TextField
            id="standard-password-input"
            label="Password (Min. 8 Characters)"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            inputRef={passwordRef}
          />
          <TextField
            id="confirm-password-input"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            fullWidth
            required
            inputRef={passwordConfirmRef}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={buttonStyle}
            disabled={loading}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </FormGroup>
        <p>
          By continuing, you acknowledge that you accept our
          <Link component={RouterLink} to="/termsOfUse">
            {" "}
            Terms & Conditions{" "}
          </Link>
        </p>
      </Paper>
      <Paper style={bottomStyle}>
        <p className="text-center">
          {" "}
          Already have an account?
          <Link component={RouterLink} to="/studentlogin">
            {" "}
            Sign In.
          </Link>
        </p>
      </Paper>
    </Grid>
  );
}
