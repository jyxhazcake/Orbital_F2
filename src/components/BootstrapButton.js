import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 3,
    backgroundColor: "#EDEDED",
    borderColor: "#EDEDED",
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#C4C4C4",
      borderColor: "#C4C4C4",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#C4C4C4",
      borderColor: "#C4C4C4",
    },
    "&:focus": {
      boxShadow: "none",
      backgroundColor: "#C4C4C4",
      borderColor: "#C4C4C4",
    },
  },
})(Button);

export default BootstrapButton;
