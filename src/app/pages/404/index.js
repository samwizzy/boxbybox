import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import Banner from "./components/Banner";
import { Store } from "./../../common/containers/components";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function About(props) {
  const classes = useStyles(props);

  return (
    <div className="container">
      <Banner />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="lg:text-center">
              <h2 className="mt-2 text-3xl md:text-5xl font-normal leading-8 tracking-tight text-gray-800 sm:text-4xl">
                404
              </h2>
              <p className="my-4 max-w-3xl text-2xl text-gray-600 lg:mx-auto">
                Looks like you've followed a broken link or entered a url that
                doesn't exist on this site
              </p>
              <p className="my-2 max-w-3xl text-lg text-gray-600 lg:mx-auto">
                <em>This page has either been deleted or moved</em>
              </p>

              <img
                src="https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg"
                alt="404"
              />
            </div>
          </div>
        </div>
      </div>

      <Store />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:text-center mb-8">
            <h6 className="uppercase text-xs tracking-widest font-medium text-gray-500">
              Blog & Events
            </h6>
            <h2 className="text-3xl font-bold my-2">News Latest</h2>
          </div>

          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {[0, 1, 2].map((item, i) => (
              <div className="flex" key={i}>
                <Card
                  className={clsx(classes.card, "flex-1")}
                  variant="outlined"
                >
                  <CardMedia
                    classes={{
                      root: "w-full h-48",
                    }}
                    image="https://image.freepik.com/free-vector/coronavirus-breaking-news-background_23-2148736973.jpg"
                    title="demo"
                  />
                  <CardContent>
                    <h3 className="mb-1 text-sm text-gray-500">
                      No lesser than 25m people are affected
                    </h3>
                    <Typography color="textSecondary" variant="caption">
                      3rd May 2020
                    </Typography>

                    <p className="text-sm mt-5 text-gray-800">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus elit elementum bibendum platea feugiat nisl morbi
                      arcu id. Feugiat lectus elit non turpis quis ullamcorper
                      magna eu sagittis.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
