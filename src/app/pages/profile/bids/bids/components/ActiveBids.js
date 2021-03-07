import React from "react";
import { useDispatch } from "react-redux";
import * as Actions from "./../../../store/actions";
import BoxUtils from "./../../../../../utils/BoxUtils";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { AppButton } from "./../../../../../common/components";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { dateDiff } from "./ExpiredBids";

const useStyles = makeStyles((theme) => ({
  root: {},
  table: {
    width: "100%",
    "& td": { border: 0, padding: theme.spacing(1, 0) },
  },
}));

export default function ActiveBids(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { bids } = props;

  const activeBids = bids.filter((bid) => !dateDiff(bid.endTime));

  return (
    <div className={classes.root}>
      {activeBids.map((bid, i) => (
        <div
          key={i}
          className="py-2 border-0 border-b border-gray-200 border-solid"
        >
          <div className="flex space-x-4">
            <div>
              <img
                src="https://image.freepik.com/free-photo/happy-asian-family-father-mother-daughter-near-new-home-real-estate_36356-245.jpg"
                alt=""
                width="180px"
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <h3 className="capitalize text-gray-600">
                {bid.ipoStake.property.title}
              </h3>
              <div className="flex flex-col md:flex-row justify-between md:space-x-1">
                <Table size="small" className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Property ID:</strong>
                      </TableCell>
                      <TableCell>{bid.ipoStake.ipoRef}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Units:</strong>
                      </TableCell>
                      <TableCell>{bid.ipoStake.property.units}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Date:</strong>
                      </TableCell>
                      <TableCell>
                        {moment(bid.ipoStake.createdAt, ["DD-MM-YYYY"]).format(
                          "ll"
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Table size="small" className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Seller:</strong>
                      </TableCell>
                      <TableCell>{bid.ipoStake.owner.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Amount:</strong>
                      </TableCell>
                      <TableCell>
                        {BoxUtils.formatCurrency(bid.bidAmount)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <AppButton
                  color="secondary"
                  variant="contained"
                  onClick={() => dispatch(Actions.openCounterBidDialog(bid))}
                >
                  Counter Bid
                </AppButton>
                <AppButton
                  color="secondary"
                  variant="outlined"
                  onClick={() => dispatch(Actions.openUpdateBidDialog(bid))}
                >
                  Update Bid
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      ))}

      {activeBids.length ? (
        <div className="flex items-center justify-center mt-16">
          <Pagination count={5} variant="outlined" color="secondary" />
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>Hey there!</AlertTitle>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center space-y-2">
            You currently have no active bid
          </div>
        </Alert>
      )}
    </div>
  );
}
