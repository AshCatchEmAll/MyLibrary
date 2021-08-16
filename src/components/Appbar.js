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
  button:{
    position: "absolute",
    right: "50px",
    padding: "15px",
    top: "5px",
    textJustify: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  }
}));

function Appbar() {
  const classes = useStyles();
  const [signedIn, setSignedIn] = useState(false);
  const history = useHistory()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        setSignedIn(true);
        return <Button>Log out</Button>;
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
        {signedIn ?? <Button>Logout</Button>}
      </Toolbar>
      <Button
      size="small"
      
        color="inherit"
      className={classes.button}
      onClick={()=>history.push("/randomBook")}
      >
        Randomizer
      </Button>
    </AppBar>
  );
}

export default Appbar;
