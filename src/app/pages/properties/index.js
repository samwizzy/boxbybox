import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import withReducer from "./../../store/withReducer";
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import Listing from "./listing";

function PropertyApp(props) {
  const { getProperties, getIpoStakes, properties } = props;

  useEffect(() => {
    getProperties();
    getIpoStakes();
    return () => {};
  }, [getProperties, getIpoStakes]);

  return (
    <Fragment>
      <Listing properties={properties} />
    </Fragment>
  );
}

const mapStateToProps = ({ propertyApp }) => {
  console.log(propertyApp, "propertyApp from index propertyApp");
  return {
    properties: propertyApp.property.properties,
    ipoStakes: propertyApp.ipostakes.boxlots,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProperties: Actions.getProperties,
      getIpoStakes: Actions.getIpoStakes,
    },
    dispatch
  );
};

export default withReducer(
  "propertyApp",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyApp)));
