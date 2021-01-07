import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import withReducer from "./../../store/withReducer";
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import Listing from "./listing";

function PropertyApp(props) {
  const { getProperties, properties } = props;

  useEffect(() => {
    getProperties();
    return () => {};
  }, [getProperties]);

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProperties: Actions.getProperties,
    },
    dispatch
  );
};

export default withReducer(
  "propertyApp",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyApp)));
