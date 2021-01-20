import React from "react";
import BoxUtils from "./../../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
}));

function BidPaymentDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const dialog = useSelector(({ bidsApp }) => bidsApp.bids.paymentDialog);

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeBidPaymentDialog())}
      aria-labelledby="bid-offers-payment"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-sm font-normal text-gray-600">
            Amount to be paid
          </h3>
          <h3 className="text-lg text-gray-800">
            {BoxUtils.formatCurrency(5000000)}
          </h3>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => dispatch(Actions.closeBidPaymentDialog())}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmBidDialog())}
        >
          Place your Bid
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BidPaymentDialog;
