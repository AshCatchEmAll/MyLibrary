import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import GoogleButton from "react-google-button";
import { makeStyles, Grid, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  center: {
    height: "100vh",
    position: "relative",
    // border: "3px solid green",
  },
  centerChild: {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  },
  anonymousButton: {
    height: "50px",
  },
}));
function SignInComponent(props) {
  const classes = useStyles();

  function signInWithGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  function signInAnonymously() {
    firebase.auth().signInAnonymously();
  }

  return (
    <div className={classes.center}>
      <Grid container className={classes.centerChild} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={1} item>
              <Paper className={classes.paper}>
                {" "}
                <GoogleButton onClick={signInWithGoogle} type="dark" />
              </Paper>
            </Grid>
            <Grid key={2} item>
              <Paper className={classes.paper}>
                <Button
                  className={classes.anonymousButton}
                  color="primary"
                  variant="contained"
                  onClick={signInAnonymously}
                >
                  Sign In Anonymously
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignInComponent;
