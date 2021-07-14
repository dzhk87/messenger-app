import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  useTheme,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import Intro from "./Intro";
import Header from "./Header";
import { useMainPageStyles } from "./hooks";

const Signup = ({ user, register }) => {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const history = useHistory();
  const theme = useTheme();
  const classes = useMainPageStyles(theme);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
          headerText={"Already have an account?"}
          buttonLabel={"Login"}
          onButtonClick={() => history.push("/login")}
        />
        <Grid container item justify="center">
          <Box width="100%" padding="10% 15%">
            <form onSubmit={handleRegister} className={classes.form}>
              <Grid>
                <Typography variant="h4" className={classes.welcomeText}>
                  Create an account.
                </Typography>
              </Grid>
              <Grid>
                <FormControl className={classes.formControl}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  className={classes.formControl}
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  className={classes.formControl}
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid container justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={classes.mainButton}
                >
                  Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
