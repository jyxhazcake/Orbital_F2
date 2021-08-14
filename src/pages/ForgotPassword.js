import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/Authcontext";
import { TextField, Grid, Paper, Button, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";

const paperStyle = {
  padding: 20,
  minHeight: "70px",
  width: 300,
  margin: "30px auto",
};

const buttonStyle = {
  margin: "8px 0",
};

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("An email has been sent to reset your password!");
    } catch {
      setError("Account does not exist");
    }

    setLoading(false);
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <p class="text-xl font-bold">Password Reset</p>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter Email Address"
          fullWidth
          required
          inputRef={emailRef}
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
          Reset Password
        </Button>
        <Link component={RouterLink} to="/studentlogin">
          ← Back to login.
        </Link>
      </Paper>

      <p class="text-center mt-6">
        {" "}
        Do not have an account?
        <Link component={RouterLink} to="/recruitersignup">
          {" "}
          Sign Up.
        </Link>
      </p>
    </Grid>
  );
};

export default ForgotPassword;
