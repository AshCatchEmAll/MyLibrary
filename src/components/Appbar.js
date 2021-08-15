import React, { useEffect,useState } from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  makeStyles,
  Button,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
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
}));

function Appbar() {
  const classes = useStyles();
  const [signedIn,setSignedIn] = useState(false)
  useEffect(()=>{
     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        var uid = user.uid;
        setSignedIn(true)
        return <Button>Log out</Button>;
      } else {
        
        setSignedIn(false)
      }
    })
  },[])
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          My Library
        </Typography>
        {
          signedIn??<Button>Logout</Button>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
