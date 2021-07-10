import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
    fontWeightBold: {
      fontWeight: "bold",
    },
  },
  button: {
    fontWeight: "bold",
    padding: "20px 60px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    white: { main: "#FFFFFF" },
  },
});
