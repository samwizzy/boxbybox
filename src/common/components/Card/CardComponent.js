import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function CardComponent(props) {
  const classes = useStyles(props);
  const { content, actions } = props;

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>{content}</CardContent>
        <CardActions>{actions}</CardActions>
      </Card>
    </div>
  );
}
