import { makeStyles } from "@material-ui/core";

export const useMainPageStyles = makeStyles(
  ({ typography, button, palette, spacing }) => ({
    root: {
      height: "100vh",
    },
    welcomeText: {
      ...typography.fontWeightBold,
    },
    headerDiv: {
      padding: spacing(4, 5),
    },
    headerText: {
      color: palette.secondary.main,
      ...typography.fontWeightBold,
      padding: spacing(3, 5),
    },
    headerButton: {
      color: palette.primary.main,
      ...button,
    },
    formControl: {
      width: "100%",
    },
    mainButton: {
      backgroundColor: palette.primary.main,
      color: palette.white.main,
      ...button,
    },
    form: {
      "& > div:nth-child(n+2)": {
        paddingTop: spacing(5),
      },
    },
  })
);
