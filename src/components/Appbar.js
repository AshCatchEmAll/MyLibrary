import React, { useEffect, useState } from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  makeStyles,
  Button,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    position: "absolute",
    right: "50px",
    padding: "15px",
    top: "5px",
    textJustify: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Appbar() {
  const classes = useStyles();
  const [signedIn, setSignedIn] = useState(false);
  const history = useHistory();
  function signOut() {
    firebase.auth().signOut();
    setSignedIn(false);
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != undefined || user != null) {
        var uid = user.uid;
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);
  return (
    <AppBar position="static" style={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          My Library
        </Typography>
        {signedIn == true ? (
          <Button
            size="small"
            color="inherit"
            variant="outlined"
            style={{margin:"15px"}}
            onClick={() => history.push("/randomBook")}
          >
            Randomizer
          </Button>
        ) : (
          <Box />
        )}
        {signedIn == true ? (
          <Button size="small" color="secondary" variant="contained" onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Box />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
