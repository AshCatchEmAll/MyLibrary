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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
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
    height: "200px",

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
 
  const classes = useStyles();
 

  async function handleBookUpdateClick() {
    console.log(props.element["createdAt"], props.element["name"]);
    await db
      .collection("/Books")
      .doc(props.element["createdAt"].toString())
      .update({
        read: !props.element["read"],
      });
    await props.refreshBooks();
   
  }

  async function handleDeleteBook() {
    await db
      .collection("/Books")

      .doc(props.element["createdAt"].toString())
      .delete();
    await props.refreshBooks();
   
  }

  
  console.log(props.element);
  return (
    <>
      <Grid
        item
        justify="center"
        xs={12}
        md={6}
        spacing={3}
        alignItems="center"
        
      >
    
        <MediaCard
          handleBookUpdateClick={handleBookUpdateClick}
          handleDeleteBook={handleDeleteBook}
          authorName={props.element["authorName"]}
          name={props.element["name"]}
          read={props.element["read"]}
        />
      </Grid>
      
    </>
  );
}
function MediaCard(props) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.authorName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.read === true? "Read": "Unread"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.handleDeleteBook}>
          Delete
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={props.handleBookUpdateClick}
        >
          Update status
        </Button>
      </CardActions>
    </Card>
  );
}
export default BookCard;
