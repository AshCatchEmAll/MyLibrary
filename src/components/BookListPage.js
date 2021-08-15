import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  makeStyles,

  TextField,
  Button,
  Radio,
  Grid,
  FormControlLabel,
  RadioGroup,

} from "@material-ui/core";
import clsx from "clsx";
import db from "../firebase/firestore";
import BookCard from "./BookCard";
const useStyles = makeStyles((theme) => ({
  root: {
    
    width: 500,
    position: "relative",
    minHeight: 200,
  },
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
  paper: {
    height: "100px",

    alignContent: "center",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
function BookListPage(props) {
  const classes = useStyles();
  const isSignedIn = props.isSignedIn;
  const user = props.user;
  const providerId = props.providerId;
  const [radioValue, setRadioValue] = useState("unread");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [open, setOpen] = useState(false);
 
  async function getAllBooks() {
    if (isLoading === false) {
      setIsLoading(true);
    }
    const usersList = await db

      .collection("/Books")
      .where("owner", "==", props.user["uid"])
      .limit(50)

      .orderBy("createdAt", "desc")
      .get();

    let tempUsersDocs = [];
    usersList.forEach((element) => {
      tempUsersDocs.push(element.data());
    });
    setBooks(tempUsersDocs);
    setIsLoading(false);
  }

  useEffect(async () => {
    await getAllBooks();
  }, []);

  function signOut() {
    firebase.auth().signOut();
  }
  function handleNameTextField(event) {
    setBookName(event.target.value);
  }
  function handleAuthorTextField(event) {
    setAuthorName(event.target.value);
  }


  async function handleAddBook() {
    const createdAt = Date.now();
    setIsLoading(true);

    await db
      .collection("/Books")
      .doc(createdAt.toString())
      .set({
        owner: user["uid"],
        name: bookName,
        authorName: authorName,
        read: radioValue === "read" ? true : false,
        createdAt: createdAt,
      });
    await getAllBooks();
    setAuthorName("");
    setBookName("");
    setIsLoading(false);
  }
  function handleRadioClick(event) {
    setRadioValue(event.target.value);
  }

  return (
    <div
      className={classes.root}
      style={{ marginTop: "50px", marginLeft: "auto", marginRight: "auto" }}
    >
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={signOut}
            style={{ width: "100%" }}
          >
            Sign out
          </Button>
        </Grid>
        
        <Grid item xs={6}justifyContent="center" >
          <TextField
            id="filled-name"
            placeholder="Enter Title"
            onChange={handleNameTextField}
            variant="filled"
            value={bookName}
          />
        </Grid>
        <Grid item xs={6} justifyContent="center">
          <TextField
            id="filled-name"
            placeholder="Enter Author name"
            onChange={handleAuthorTextField}
            variant="filled"
            value={authorName}
          />
        </Grid>
        <RadioGroup
          style={{ marginLeft: "8px" }}
          aria-label="Read-Unread"
          name="Read-Unread"
          value={radioValue}
          onChange={handleRadioClick}
        >
          <Grid item xs={6}>
            <FormControlLabel value="read" control={<Radio />} label="Read" />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              value="unread"
              control={<Radio />}
              label="Unread"
            />
          </Grid>
        </RadioGroup>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBook}
            style={{ width: "100%" }}
          >
            Add Book
          </Button>
        </Grid>
        {books.map((element) => {
          return (
            <BookCard
              user={props.user}
              element={element}
              refreshBooks={getAllBooks}
             
            />
          );
        })}
      </Grid>
    </div>
  );
}

export default BookListPage;
