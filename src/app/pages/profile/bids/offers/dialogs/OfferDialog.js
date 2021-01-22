import React from "react";
import BoxUtils from "./../../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../store/actions";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
  table: {
    width: "100%",
    "& td": { border: 0 },
  },
  rejected: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  accepted: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

function OfferDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const dialog = useSelector(({ bidsApp }) => bidsApp.bids.offerDialog);
  // const { data } = dialog.data;

  const bid = { id: 1, title: "Luxurious Apartment" };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeOfferDialog())}
      aria-labelledby="merge-subslots"
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <div className="flex space-x-3">
          <div>
            <img
              src="https://image.freepik.com/free-photo/happy-asian-family-father-mother-daughter-near-new-home-real-estate_36356-245.jpg"
              alt=""
              width="180px"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <h3 className="text-lg text-gray-800">{bid.title}</h3>
            <div className="flex flex-col md:flex-row justify-between md:space-x-1">
              <Table size="small" className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Property ID:</strong>
                    </TableCell>
                    <TableCell>R001XXXEN</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Units:</strong>
                    </TableCell>
                    <TableCell>{BoxUtils.formatCurrency(105)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Date:</strong>
                    </TableCell>
                    <TableCell>{moment().format("ll")}</TableCell>
                  </TableRow>
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
                    <TableCell>{BoxUtils.formatCurrency(750000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Time remaining:</strong>
                    </TableCell>
                    <TableCell>{moment().format("hh:mm:ss")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.accepted}
          onClick={() => dispatch(Actions.openBidPaymentDialog())}
        >
          Accept Offer
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.rejected}
        >
          Reject Offer
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(Actions.closeOfferDialog())}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OfferDialog;
