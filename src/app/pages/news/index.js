import React, { useEffect } from "react";
import clsx from "clsx";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import Banner from "./components/Banner";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function News(props) {
  const classes = useStyles(props);

  useEffect(() => {}, []);

  if (!true) {
    return <p>Loading...</p>;
  }

  return (
    <div className="root">
      <Banner />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <ul className="list-reset flex items-center py-2 overflow-x-auto">
              <li className="-mb-px mr-1">
                <h6 className="uppercase text-lg tracking-widest font-medium text-gray-600">
                  Category:
                </h6>
              </li>
              {_.range(0, 6).map((item) => (
                <li key={item} className="-mb-px mr-2 flex-shrink-0">
                  <a
                    className="bg-white border border-solid no-underline inline-block rounded-3xl py-2 px-4 text-blue-dark whitespace-nowrap hover:text-blue-darker active:bg-blue-800 font-semibold"
                    href="/news"
                  >
                    Real Estate
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {_.range(0, 9).map((item, i) => (
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
