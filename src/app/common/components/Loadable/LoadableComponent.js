import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function LoadableComponent(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress size={24} />
    </div>
  );
}
