import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const LoginButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 3,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
})(Button);

export default LoginButton;
