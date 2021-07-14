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
  useTheme,
} from "@material-ui/core";
import Intro from "./Intro";
import { login } from "./store/utils/thunkCreators";
import { useMainPageStyles } from "./hooks";
import Header from "./Header";

const Login = ({ user, login }) => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useMainPageStyles(theme);

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
        <Header
          headerText={"Don't have an account?"}
          buttonLabel={"Register"}
          onButtonClick={() => history.push("/register")}
        />
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
                  label="Password"
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
