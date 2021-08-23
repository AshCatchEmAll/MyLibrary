import React from "react";
import { Dialog, List, ListItem, Button } from "@material-ui/core";


function ErrorDialog(props) {


  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <List>
          <ListItem>{props.message}</ListItem>
          <ListItem>
            <Button onClick={props.onClose.bind(this, false)}>Cancel</Button>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default ErrorDialog;
