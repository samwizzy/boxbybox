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
  return {
    properties: propertyApp.property.properties,
    boxpiles: propertyApp.boxpiles.boxlots,
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
