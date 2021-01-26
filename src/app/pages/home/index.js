import React, { useEffect } from "react";
import withReducer from "./../../store/withReducer";
import { connect, useDispatch } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Banner from "./components/Banner";
import { Store } from "../../common/containers/components";
import { FeatureCard } from "../../common/components";
import Services from "./components/Services";
import News from "./components/News";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: { margin: theme.spacing(6, 0) },
}));

export function Home(props) {
  const classes = useStyles(props);
  const { news, properties } = props;
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

          <Services />
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-light mb-8 text-center">
            Featured Properties
          </h2>
          <dl className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-x-6">
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

      <News news={news} />
    </div>
  );
}

const mapStateToProps = ({ homeApp }) => {
  return {
    news: homeApp.news.data,
    properties: homeApp.property.properties,
  };
};

export default withReducer("homeApp", reducer)(connect(mapStateToProps)(Home));
