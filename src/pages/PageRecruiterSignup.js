import React, { useRef, useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Button,
  Link,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink, useHistory } from "react-router-dom";
import logo from "../components/img/NVJBlogo.png";
import kids from "../components/img/kids.png";
import { useAuth } from "../contexts/Authcontext";

const paperStyle = {
  padding: "20px",
  width: 310,
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
  overflowY: "scroll",
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
  width: 310,
};

/*const useStyles = makeStyles({
    label: {
      fontSize: '14px',
    },
});

useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection('Users').doc(uid).set({
      Organisation: organisationNameRef.current.value,
      UEM_SRN: idRef.current.value,
      Contact: contactNameRef.current.value,
      OrganisationMobile: contactRef.current.value,
      ContactMobile: mobileRef.current.value,
    });
  });*/

export default function PageRecruiterSignup() {
  const organisationNameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const passwordRef = useRef();
  const idRef = useRef();
  const contactNameRef = useRef();
  const mobileRef = useRef();
  const passwordConfirmRef = useRef();
  const { recruiterSignup, adminAssistSignUp } = useAuth();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  async function handleSubmitNoUEM(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length < 8) {
      return setError("Passwords have to be greater than 8 characters!");
    }

    try {
      setError("");
      setLoading(true);
      await adminAssistSignUp(
        emailRef.current.value,
        passwordRef.current.value,
        organisationNameRef.current.value,
        contactNameRef.current.value,
        contactRef.current.value,
        mobileRef.current.value
      );
      history.push("/submitted");
    } catch {
      setError("Failed to submit account request!");
    }

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length < 8) {
      return setError("Passwords have to be greater than 8 characters!");
    }

    if (contactRef.current.value.length < 8) {
      return setError("Invalid contact phone number!");
    }

    if (mobileRef.current.value.length < 8) {
      return setError("Invalid organisation phone number!");
    }

    try {
      setError("");
      setLoading(true);
      await recruiterSignup(
        emailRef.current.value,
        passwordRef.current.value,
        organisationNameRef.current.value,
        idRef.current.value,
        contactNameRef.current.value,
        contactRef.current.value,
        mobileRef.current.value
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <Grid>
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
            label="Organisation Name"
            placeholder="Enter Organisation Name"
            fullWidth
            required
            inputRef={organisationNameRef}
          />
          <TextField
            label="UEN/Society Registration Number"
            placeholder="Enter ID here"
            disabled={checked}
            fullWidth
            required
            inputRef={idRef}
          />
          <div className="flex items-center justify-start pt-1">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <div className="italic text-xs font-bold">
              No UEM/ Registration no.
            </div>
          </div>
          <TextField
            label="Name of Contact Person"
            placeholder="Enter Name of contact"
            fullWidth
            required
            inputRef={contactNameRef}
          />
          <TextField
            label="Organisation Contact number"
            placeholder="Organisation Contact number"
            fullWidth
            required
            inputRef={contactRef}
          />
          <TextField
            label="Contact Person Mobile Number"
            placeholder="Enter mobile number"
            fullWidth
            required
            inputRef={mobileRef}
          />
          <TextField
            label="Organisation Email"
            placeholder="Enter Email Address"
            fullWidth
            required
            inputRef={emailRef}
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
            onClick={checked ? handleSubmitNoUEM : handleSubmit}
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
          <Link component={RouterLink} to="/recruiterlogin">
            {" "}
            Sign In.
          </Link>
        </p>
      </Paper>
    </Grid>
  );
}
