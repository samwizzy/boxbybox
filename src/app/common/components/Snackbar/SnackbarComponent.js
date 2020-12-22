import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Button, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SnackbarComponent(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Snackbar>
        <Alert>
          <Typography></Typography>
          <Button></Button>
        </Alert>
      </Snackbar>
    </div>
  );
}
