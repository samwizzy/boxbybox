import React from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../../common/components";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      padding: theme.spacing(0, 4, 2, 4),
    },
  },
}));

function BidPaymentDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ propertyDetails }) => propertyDetails.bids.paymentDialog
  );

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeBidPaymentDialog())}
      aria-labelledby="bid-offers-payment"
    >
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-sm font-normal text-gray-600">
            Your Total Payment is
          </h3>
          <h3 className="text-lg text-gray-800">
            {BoxUtils.formatCurrency(5000000)}
          </h3>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="outlined"
          onClick={() => dispatch(Actions.closeBidPaymentDialog())}
        >
          Back
        </AppButton>
        <AppButton size="small" variant="contained" color="secondary">
          Confirm Payment
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default BidPaymentDialog;
