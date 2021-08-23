import React, { useState } from "react";


import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ProgressButton from "../components/ProgressButton";
import db from "../firebase/firestore";
import firebase from "firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const axios = require("axios");
var randomWords = require("random-words");

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function RandomBookPage() {
  const classes = useStyles();
  const [book, setBook] = useState("");
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function getRandomBook() {
    try {
      const searchTerm = randomWords();
      const url = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

      const response = await axios.get(url);
      if (response.data.items !== "undefined" || response.data.items !== null) {
        const random = Math.floor(Math.random() * response.data.items.length);
        const b = {
          name: response.data.items[random].volumeInfo.title,
          author: JSON.stringify(
            response.data.items[random].volumeInfo.authors[0]
          ),
          desc: response.data.items[random].volumeInfo.description,
          infoLink: response.data.items[random].volumeInfo.infoLink,
        };
        console.log(response.data.items[random].volumeInfo);
        setBook(b);
      }
    } catch (error) {
      console.error(error);
    }
  }
  function textEllipsis(
    str,
    maxLength,
    { side = "end", ellipsis = "..." } = {}
  ) {
    if (str.length > maxLength) {
      switch (side) {
        case "start":
          return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case "end":
        default:
          return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
    }
    return str;
  }
  async function handleAddBook() {
    const createdAt = Date.now();
    let user = firebase.auth().currentUser;

    if (user.uid !== undefined) {
      try {
        await db.collection("/Books").doc(createdAt.toString()).set({
          owner: user.uid,
          name: book["name"],
          authorName: book["author"],
          read: false,
          createdAt: createdAt,
        });
        handleClick();
      } catch (e) {
        console.log("ERROR adding random book ", e.message);
      }
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />

      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Random Book
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Click the 📙 Button and get a random book suggestion ! You can click
          on the MORE button to get more info 🌻
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={4}>
            {book !== "" ? (
              <Card style={{ cursor: "pointer" }}>
                <CardHeader
                  title={book["name"]}
                  subheader={book["author"]}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography
                      component="h6"
                      variant="h6"
                      color="textSecondary"
                    >
                      {book["desc"] === undefined
                        ? ""
                        : textEllipsis(book["desc"], 200)}
                    </Typography>
                  </div>
                  <CardActions>
                    <ProgressButton
                      progressSize="30px"
                      fullWidth={true}
                      variant="outlined"
                      color="secondary"
                      onClick={handleAddBook}
                      buttonText={"Add"}
                    />
                    <ProgressButton
                      progressSize="30px"
                      fullWidth={true}
                      variant="outlined"
                      color="secondary"
                      onClick={() => window.open(book["infoLink"])}
                      buttonText={"More"}
                    />
                  </CardActions>
                </CardContent>
              </Card>
            ) : (
              <Box />
            )}
            <Box height={50} />
            <ProgressButton
              progressSize="30px"
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={getRandomBook}
              buttonText={"📙"}
            />
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
         Book added to your reading list
        </Alert>
      </Snackbar>
      {/* Footer */}
      {/* <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
}
