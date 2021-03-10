import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import withReducer from "./../../../store/withReducer";
import reducer from "./../store/reducers";
import * as Actions from "./../store/actions";
import BoxUtils from "./../../../utils/BoxUtils";
import clsx from "clsx";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Alert, AlertTitle, Pagination, Skeleton } from "@material-ui/lab";
import { AppBreadcrumbs, AppButton } from "../../../common/components";
import ConfirmBoxpileDialog from "./components/ConfirmBoxpileDialog";
import BuyIpoStakeDialog from "./../property-details/dialogs/BuyIpoStakeDialog";
import ConfirmIpoStakeDialog from "./../property-details/dialogs/ConfirmIpoStakeDialog";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0),
  },
  table: {
    display: "flex",
    "& td": {},
  },
  noBorder: {
    minWidth: "100%",
    "& td": {
      border: "none !important",
    },
  },
}));

function BoxPiles(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const {
    boxlots,
    property,
    getPropertyById,
    getIpoStakeByPropertyId,
    openIpoStakeDialog,
    openConfirmBoxpileDialog,
    user,
    match,
  } = props;
  const { params } = match;
  console.log(params, "params get boxlot by property");
  console.log(boxlots, "boxlots by property sam");
  console.log(property, "property by property");

  useEffect(() => {
    getPropertyById(params.id);
    getIpoStakeByPropertyId(params.id);
    return () => {};
  }, [getIpoStakeByPropertyId, getPropertyById, params]);

  const handlePaginate = (event, page) => {
    dispatch(Actions.getIpoStakeByPropertyId(params.id, page - 1));
  };

  console.log(user, "user");
  console.log(boxlots, "boxlots");

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-6">
              {property ? (
                <AppBreadcrumbs
                  prevLinks={{
                    Properties: "/properties",
                    [property.propertyRef]: `/property/${property.id}`,
                  }}
                  current="Boxpiles"
                />
              ) : (
                <Skeleton />
              )}

              <h3 className="text-gray-800 font-medium text-lg my-4">
                Boxpiles
              </h3>
              <Divider className={classes.divider} />

              {!boxlots.total && (
                <Alert severity="info">
                  <AlertTitle>Hey there!</AlertTitle>
                  <div className="flex items-center space-x-4">
                    There are no boxpiles on this property yet —&nbsp;
                    <strong>be the first to stake now!</strong>
                    {property ? (
                      <div className="flex flex-col items-start space-y-2">
                        <AppButton
                          variant="contained"
                          color="secondary"
                          disabled={
                            !property.unitsAvailable ||
                            user.id === property.createdBy.id
                          }
                          onClick={() => openIpoStakeDialog(property)}
                        >
                          Buy Boxpile
                        </AppButton>
                        {user.id === property.createdBy.id && (
                          <em className="text-xs text-gray-600">
                            You can not obtain boxpile on your own property
                          </em>
                        )}
                      </div>
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </Alert>
              )}

              <div>
                {boxlots.entities.map((boxlot, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-x-2 p-2 border-0 border-b border-solid border-gray-300"
                  >
                    <div className="col-span-4 md:col-span-3">
                      <img
                        src="https://image.freepik.com/free-photo/stay-home-concept-wooden-table-side-view-hand-holding-wooden-cube_176474-9516.jpg"
                        alt=""
                        className="w-full md:w-60"
                      />
                    </div>
                    <div className="col-span-8 md:col-span-6">
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
                            <TableCell>{boxlot.ipoRef}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Purchased Price:</strong>
                            </TableCell>
                            <TableCell>
                              {BoxUtils.formatCurrency(boxlot.purchaseAmount)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Selling Price:</strong>
                            </TableCell>
                            <TableCell>
                              {BoxUtils.formatCurrency(boxlot.sellingAmount)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Number of Units:</strong>
                            </TableCell>
                            <TableCell>{boxlot.noOfUnitsPurchased}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="col-span-12 md:col-span-3 pt-2 md:pt-0">
                      <AppButton
                        color="secondary"
                        variant="contained"
                        disabled={!boxlot.isForSale}
                        onClick={() => openConfirmBoxpileDialog(boxlot.id)}
                      >
                        {boxlot.isForSale ? "Buy Boxpile" : "Not for Sale"}
                      </AppButton>
                    </div>
                  </div>
                ))}
              </div>

              {boxlots.total ? (
                <div className="flex items-center justify-center mt-16">
                  <Pagination
                    count={_.ceil(boxlots.total / boxlots.limit)}
                    variant="outlined"
                    color="secondary"
                    onChange={handlePaginate}
                  />
                </div>
              ) : (
                ""
              )}

              <BuyIpoStakeDialog />
              <ConfirmIpoStakeDialog />
              <ConfirmBoxpileDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth, boxpileApp }, state) => {
  console.log(state, "state store");
  console.log(boxpileApp, "propertyApp from index propertyApp");
  return {
    boxlots: boxpileApp.boxpiles.boxlots,
    property: boxpileApp.property.property,
    user: auth.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPropertyById: Actions.getPropertyById,
      getIpoStakeByPropertyId: Actions.getIpoStakeByPropertyId,
      openIpoStakeDialog: Actions.openIpoStakeDialog,
      openConfirmBoxpileDialog: Actions.openConfirmBoxpileDialog,
    },
    dispatch
  );
};

export default withReducer(
  "boxpileApp",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(BoxPiles)));
