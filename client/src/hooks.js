import { makeStyles } from "@material-ui/core";

export const useMainPageStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
  welcomeText: {
    fontWeight: "600",
  },
  headerDiv: {
    padding: "30px 40px",
  },
  headerText: {
    color: "#b9b9b9",
    fontWeight: "600",
    padding: "20px 40px",
  },
  headerButton: {
    color: "#3a8dff",
    fontWeight: "600",
    padding: "20px 60px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  },
  formControl: {
    width: "100%",
  },
  mainButton: {
    backgroundColor: "#3a8dff",
    color: "#ffffff",
    fontWeight: "600",
    padding: "15px 45px",
  },
  form: {
    "& > div:nth-child(n+2)": {
      paddingTop: "40px",
    },
  },
}));
