import React, { useEffect } from "react";
import withReducer from "./../../store/withReducer";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import Banner from "./components/Banner";
import { Store } from "../../common/containers/components";
import { FeatureCard } from "../../common/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: { margin: theme.spacing(6, 0) },
}));

export function Home(props) {
  const classes = useStyles(props);
  const properties = useSelector(({ homeApp }) => homeApp.property.properties);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getProperties());
    return () => {};
  }, [dispatch]);

  return (
    <div>
      <Banner />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:text-center">
            <h2 className="mt-2 text-3xl md:text-4xl font-normal leading-8 tracking-tight text-gray-800 sm:text-4xl">
              Who we are
            </h2>
            <p className="my-4 max-w-3xl text-lg text-gray-600 lg:mx-auto">
              <strong className="font-semibold">BOXBYBOX</strong> is born out of
              the need to create an all inclusive the real estate industry where
              individuals irrespective of their socio-economic status can invest
              and benefit from proceeds derivable from this very stable and
              profitable industry and in so doing bring more revenue into the
              industry, shorten the lag between listing and sales, facilitate
              remote investments and purchases and standardize the tools of
              property evaluation in industry.
            </p>
          </div>

          <Divider className={classes.divider} />

          <div className="">
            <div className="lg:text-center">
              <h5 className="text-gray-400 text-sm tracking-wide mt-4 font-normal">
                Explore features
              </h5>
              <h2 className="text-gray-800 font-extrabold">
                Services You Need
              </h2>
            </div>

            <dl className="bg-white mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
              {[0, 1, 2, 3].map((item, i) => (
                <div className="flex" key={i}>
                  <Card
                    className={clsx(classes.card, "flex-1")}
                    variant="outlined"
                  >
                    <CardMedia
                      classes={{
                        root:
                          "h-16 w-16 border bg-indigo-900 rounded-full mx-auto mt-2",
                      }}
                      image=".."
                      title="demo"
                    />
                    <CardContent className="text-center">
                      <h3 className="mb-1 text-lg text-gray-800">BBB Offers</h3>

                      <Typography variant="subtitle2" color="textPrimary">
                        BBB survey hit higher, there are property applications
                        with our features and quality properties.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-light my-8 text-center">
            Featured Properties
          </h2>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {properties.entities.slice(0, 4).map((property, i) => (
              <div className="flex" key={i}>
                <FeatureCard property={property} />
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

export default withReducer("homeApp", reducer)(Home);
