import { Grid, Typography, Button, useTheme } from "@material-ui/core";
import { useMainPageStyles } from "./hooks";

const Header = ({ headerText, buttonLabel, onButtonClick }) => {
  const theme = useTheme();
  const classes = useMainPageStyles(theme);

  return (
    <Grid
      container
      item
      justify="flex-end"
      alignItems="center"
      className={classes.headerDiv}
    >
      <Typography className={classes.headerText}>{headerText}</Typography>
      <Button className={classes.headerButton} onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </Grid>
  );
};

export default Header;
