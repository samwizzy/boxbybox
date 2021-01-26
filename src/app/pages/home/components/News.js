import React from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export function News(props) {
  const classes = useStyles(props);
  const { news } = props;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center mb-8">
          <h6 className="uppercase text-xs tracking-widest font-medium text-gray-500">
            Blog & Events
          </h6>
          <h2 className="text-3xl font-bold my-2">News Latest</h2>
        </div>

        <dl className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6">
          {news.slice(0, 3).map((_new, i) => (
            <div className="flex" key={i}>
              <Card className={clsx(classes.card, "flex-1")} variant="outlined">
                <CardMedia
                  classes={{
                    root: "w-full h-48",
                  }}
                  image="https://image.freepik.com/free-vector/coronavirus-breaking-news-background_23-2148736973.jpg"
                  title="demo"
                />
                <CardContent>
                  <h3 className="mb-1 text-sm text-gray-500">{_new.title}</h3>
                  <Typography color="textSecondary" variant="caption">
                    {moment(_new.dateCreated).format("ll")}
                  </Typography>

                  <p className="text-sm mt-5 text-gray-800">
                    {_new.description}.
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default News;
