import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  CircularProgress,
  Paper,
  Fab,
  TextField,
  Button,
  Radio,
  Grid,
  FormControlLabel,
  RadioGroup,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import {
  Add,
  DeleteForever,
  Navigation,
  UpdateRounded,
} from "@material-ui/icons";
import db from "../firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
function BookCard(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  function handleBookClick() {
    setOpen(true);
  }

  async function handleBookUpdateClick() {
    console.log(props.element["createdAt"], props.element["name"]);
    await db
      .collection("/Books")
      .doc(props.element["createdAt"].toString())
      .update({
        read: !props.element["read"],
      });
    await props.refreshBooks();
    setOpen(false);
  }

  async function handleDeleteBook() {
    await db
      .collection("/Books")
      .where("owner", "==", props.user["uid"])
      .doc(props.element["createdAt"].toString())
      .delete();
    await props.refreshBooks();
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }
  console.log(props.element);
  return (
    <>
      <Grid
        item
        xs={3}
        spacing={3}
        alignItems="center"
        onClick={handleBookClick}
      >
        <Paper className={classes.paper}>
          <Typography>{props.element["name"]} </Typography>

          <Typography>
            {props.element["read"] === true ? "true" : "false"}
          </Typography>
        </Paper>
      </Grid>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Book Sesttings</DialogTitle>
        <List>
          <ListItem autoFocus button onClick={handleDeleteBook}>
            <ListItemAvatar>
              <Avatar>
                <DeleteForever />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete book" />
          </ListItem>
          <ListItem autoFocus button onClick={handleBookUpdateClick}>
            <ListItemAvatar>
              <Avatar>
                <UpdateRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Update read status" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default BookCard;
