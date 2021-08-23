import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
function ProgressButton(props) {
  const [isLoading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await props.onClick();
    } catch (e) {
      console.log("Error in progress button : ", e);
    } finally {
      setLoading(false);
    }
  }
  console.log(props.progressSize)
  return (
    <Button
      fullWidth={props.fullWidth}
      onClick={handleClick}
      size={props.size}
      color={props.color}
      className={props.className}
      variant={props.variant}
    >
      {isLoading ? (
        <CircularProgress size={props.progressSize||40} color="secondary"></CircularProgress>
      ) : (
        props.buttonText
      )}
    </Button>
  );
}
export default ProgressButton;
