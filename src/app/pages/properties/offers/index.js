import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import withReducer from "./../../../store/withReducer";
import reducer from "./../store/reducers";
import * as Actions from "./../store/actions";
import BoxUtils from "./../../../utils/BoxUtils";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Breadcrumbs from "../components/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0),
  },
  noBorder: {
    "& td": {
      border: "none !important",
    },
  },
}));

function Offers(props) {
  const classes = useStyles(props);
  const { properties, getProperties } = props;

  useEffect(() => {
    getProperties();
    return () => {};
  }, [getProperties]);

  if (!properties.entities) {
    return null;
  }

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-6">
              <Breadcrumbs />

              <h3 className="text-gray-800 font-medium text-lg my-4">
                BBB Offers
              </h3>
              <Divider className={classes.divider} />

              <Table size="small">
                <TableBody>
                  {properties.entities.map((property, i) => (
                    <TableRow>
                      <TableCell>
                        <img
                          src="https://image.freepik.com/free-vector/logo-template-design_1289-160.jpg"
                          alt=""
                          height="180px"
                        />
                      </TableCell>
                      <TableCell>
                        <Table
                          size="small"
                          padding="none"
                          className={classes.noBorder}
                        >
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <strong>Property ID:</strong>
                              </TableCell>
                              <TableCell>S001XXXEN/1/40/5/JD</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Price:</strong>
                              </TableCell>
                              <TableCell>
                                {BoxUtils.formatCurrency(500000)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Number of Units:</strong>
                              </TableCell>
                              <TableCell>5</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Button color="secondary" variant="contained">
                          Buy BBB Offer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-center mt-16">
                <Pagination count={10} variant="outlined" color="secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ offersApp }) => {
  console.log(offersApp, "propertyApp from index propertyApp");
  return {
    properties: offersApp.property.properties,
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
  "offersApp",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Offers)));
