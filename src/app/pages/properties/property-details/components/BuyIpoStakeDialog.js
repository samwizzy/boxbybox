import React, { useState } from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../../common/components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(2),
    },
  },
}));

function BuyIpoStakeDialog(props) {
  const classes = useStyles(props);
  const [form, setForm] = useState({
    purchaseAmount: 0,
    unitsPurchased: 0,
  });
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ propertyDetails }) => propertyDetails.ipostakes.ipoStakeDialog
  );
  const { data } = dialog;

  console.log(dialog, "dialog buy queue shit");
  console.log(form, "form buy queue shit");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
      purchaseAmount: data
        ? (data.price / data.units) * Number(event.target.value)
        : 0,
    });
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeIpoStakeDialog())}
      aria-labelledby="bid-offers-payment"
    >
      <DialogTitle>Buy IPO Stake</DialogTitle>
      <DialogContent>
        <div className="text-center px-4">
          <h3 className="text-sm font-medium text-gray-600">
            Number of Units : <span>{data && data.units}</span>
          </h3>
          <h4 className="text-sm font-normal text-gray-600 my-4">
            Make your Offer
          </h4>
          <span className="flex justify-between items-center gap-6 mt-8">
            <div>
              <TextField
                id="units-purchased"
                name="unitsPurchased"
                label="Number of Units"
                value={form.unitsPurchased}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs">Amount</span>
              <Typography color="secondary">
                {BoxUtils.formatCurrency(form.purchaseAmount)}
              </Typography>
            </div>
          </span>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmIpoStakeDialog(form))}
        >
          Buy Stake
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default BuyIpoStakeDialog;
