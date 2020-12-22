import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {},
}));

export default function ServiceCardComponent(props) {
  const classes = useStyles(props);
  const { title, content } = props;

  return (
    <div className={classes.root}>
      <Card className={clsx(classes.card, "flex-1")} variant="outlined">
        <CardMedia
          classes={{
            root: "h-16 w-16 border bg-indigo-900 rounded-full mx-auto mt-2",
          }}
          image=".."
          title="demo"
        />
        <CardContent className="text-center">
          <h3 className="mb-1 text-lg text-gray-800">{title}</h3>

          <Typography variant="subtitle2" color="textPrimary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
