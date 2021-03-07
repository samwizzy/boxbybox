import React from "react";
import BoxUtils from "./../../../../../utils/BoxUtils";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Chip, Table, TableBody, TableRow, TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  table: {
    width: "100%",
    "& td": { border: 0, padding: theme.spacing(1, 0) },
  },
}));

export const dateDiff = (date) => {
  return moment().diff(moment(date, "DD-MM-YYYY")) > -1;
};

export default function ExpiredBids(props) {
  const classes = useStyles(props);
  const { bids } = props;

  const expiredBids = bids.filter((bid) => dateDiff(bid.endTime));

  return (
    <div className={classes.root}>
      {expiredBids.map((bid, i) => (
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
              <h3 className="capitalize text-gray-800">
                {bid.ipoStake.property.title}{" "}
                {dateDiff(bid.endTime) && (
                  <Chip label="Expired" variant="outlined" color="primary" />
                )}
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
            </div>
          </div>
        </div>
      ))}

      {expiredBids.length ? (
        <div className="flex items-center justify-center mt-16">
          <Pagination count={5} variant="outlined" color="secondary" />
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>Hey there!</AlertTitle>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center space-y-2">
            You currently have no expired bid
          </div>
        </Alert>
      )}
    </div>
  );
}
