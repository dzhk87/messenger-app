import { Hidden, Grid, Icon, Typography, makeStyles } from "@material-ui/core";
import BackgroundImage from "./static/images/bg-img.png";
import BubbleIcon from "./static/images/bubble.svg";

const useStyles = makeStyles(() => ({
  imageCard: {
    backgroundImage: `linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${BackgroundImage})`,
    backgroundSize: "cover",
  },
  iconRoot: {
    width: "auto",
    height: "auto",
  },
  imageText: {
    color: "#ffffff",
    lineHeight: "1.5",
    fontWeight: "600",
  },
}));

const Intro = () => {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Grid
        container
        item
        md={5}
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.imageCard}
      >
        <Icon className={classes.iconRoot}>
          <img src={BubbleIcon} alt="Chat bubble icon" />
        </Icon>
        <Typography variant="h4" align="center" className={classes.imageText}>
          Converse with anyone
          <br />
          with any language
        </Typography>
      </Grid>
    </Hidden>
  );
};

export default Intro;
