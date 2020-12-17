import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import Banner from "./components/Banner";
import data from "./fakedb.json";
import { Store } from "./../../common/containers/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  media1: {
    backgroundSize: theme.spacing(6), // 48px
  },
  media2: {
    backgroundSize: "contain",
  },
}));

export default function About(props) {
  const classes = useStyles(props);
  const store = useSelector((state) => state);
  console.log(store, "store");

  return (
    <div className="container">
      <Banner />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <h2 className="mt-2 text-3xl md:text-4xl font-normal leading-8 tracking-tight text-gray-800 sm:text-4xl">
                Executive Summary and Mission statement
              </h2>
              <p className="my-4 max-w-3xl text-lg text-gray-600 lg:mx-auto">
                <strong className="font-semibold">BOXBYBOX</strong> is born out
                of the need to create an all inclusive the real estate industry
                where individuals irrespective of their socio-economic status
                can invest and benefit from proceeds derivable from this very
                stable and profitable industry and in so doing bring more
                revenue into the industry, shorten the lag between listing and
                sales, facilitate remote investments and purchases and
                standardize the tools of property evaluation in industry.
              </p>
            </div>
            <div>
              <img
                src="https://image.freepik.com/free-vector/about-us-concept-illustration_114360-669.jpg"
                alt="about bbb"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:text-center">
            <h2 className="text-gray-800 text-3xl font-normal">
              What we offer
            </h2>
          </div>

          <dl className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {data.offers.map((item, i) => (
              <div className="flex" key={i}>
                <Card
                  className={clsx(classes.card, "flex-1")}
                  variant="outlined"
                >
                  <CardMedia
                    className={clsx(
                      classes.media1,
                      "h-24 w-24 border border-solid bg-gray-200 rounded-full mx-auto mb-4 mt-8"
                    )}
                    image={item.icon}
                    title="demo"
                  />
                  <CardContent className="text-center">
                    <h3 className="mb-1 text-lg text-gray-800">{item.title}</h3>

                    <Typography variant="subtitle2" color="textPrimary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-light my-8 text-center">Our Team</h2>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {[0, 1, 2, 3].map((item, i) => (
              <div className="flex" key={i}>
                <Card
                  className={clsx(classes.card, "flex-1")}
                  variant="outlined"
                >
                  <CardMedia
                    className={clsx(classes.media2, "w-full h-60")}
                    image="assets/images/about/team.svg"
                    title="team"
                  />
                  <CardContent className="text-center">
                    <h3 className="mb-1 text-lg text-gray-800">John Doe</h3>
                    <h3 className="mb-1 text-sm text-gray-500">Manager</h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Store component */}
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
