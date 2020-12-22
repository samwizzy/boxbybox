import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function NewsCardComponent(props) {
  const classes = useStyles(props);
  const { newsData } = props;

  return (
    <div className={classes.root}>
      <Card className={clsx(classes.card, "flex-1")} variant="outlined">
        <CardMedia
          classes={{
            root: "w-full h-48",
          }}
          image="https://image.freepik.com/free-vector/coronavirus-breaking-news-background_23-2148736973.jpg"
          title="demo"
        />
        <CardContent>
          <h3 className="mb-1 text-sm text-gray-500">{newsData.title}</h3>
          <Typography color="textSecondary" variant="caption">
            {newsData.datePosted}
          </Typography>

          <p className="text-sm mt-5 text-gray-800">{newsData.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
