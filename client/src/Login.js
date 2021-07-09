import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import Intro from "./Intro";
import { login } from "./store/utils/thunkCreators";
import { useMainPageStyles } from "./hooks";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useMainPageStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <Intro />
      <Grid
        container
        item
        xs={12}
        md={7}
        direction="column"
        alignItems="center"
      >
        <Grid
          container
          item
          justify="flex-end"
          alignItems="center"
          className={classes.headerDiv}
        >
          <Typography className={classes.headerText}>
            Don't have an account?
          </Typography>
          <Button
            className={classes.headerButton}
            onClick={() => history.push("/register")}
          >
            Register
          </Button>
        </Grid>
        <Grid container item justify="center">
          <Box width="100%" padding="10% 15%">
            <form onSubmit={handleLogin} className={classes.form}>
              <Grid>
                <Typography variant="h4" className={classes.welcomeText}>
                  Welcome back!
                </Typography>
              </Grid>
              <Grid>
                <FormControl className={classes.formControl} required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <FormControl className={classes.formControl} required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid container justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={classes.mainButton}
                >
                  Login
                </Button>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
