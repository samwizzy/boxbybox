import React from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function BidPaymentDialog(props) {
  const dispatch = useDispatch();
  const dialog = useSelector(({ boxlotApp }) => boxlotApp);

  console.log(dialog, "dialog state bid payment");

  return (
    <Dialog
      open={dialog.open}
      onClose={() => dispatch(Actions.closeBidPaymentDialog())}
      aria-labelledby="bid-offers-payment"
    >
      <DialogContent>
        <DialogTitle>Your Total Payment is</DialogTitle>
        <h3 className="text-gray-800">{BoxUtils.formatCurrency(5000000)}</h3>
      </DialogContent>

      <DialogActions>
        <Button variant="contained">Back</Button>
        <Button variant="contained" color="secondary">
          Confirm Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BidPaymentDialog;
