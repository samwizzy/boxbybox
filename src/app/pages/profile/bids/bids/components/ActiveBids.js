import React from "react";
import BoxUtils from "./../../../../../utils/BoxUtils";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  table: {
    width: "100%",
    "& td": { border: 0, padding: theme.spacing(1, 0) },
  },
}));

export default function ActiveBids(props) {
  const classes = useStyles(props);
  const { bids } = props;

  return (
    <div className={classes.root}>
      {bids.entities.map((bid, i) => (
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
              <h3 className="capitalize text-gray-600">{bid.title}</h3>
              <div className="flex flex-col md:flex-row justify-between md:space-x-1">
                <Table size="small" className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Property ID:</strong>
                      </TableCell>
                      <TableCell>{bid.propertyRef}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Units:</strong>
                      </TableCell>
                      <TableCell>{bid.units}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Date:</strong>
                      </TableCell>
                      <TableCell>{moment().format("ll")}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Table size="small" className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Seller:</strong>
                      </TableCell>
                      <TableCell>John Doe</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Amount:</strong>
                      </TableCell>
                      <TableCell>
                        {BoxUtils.formatCurrency(bid.price)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
