import React, { useState, useEffect } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import withReducer from "./../../../../store/withReducer";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../../common/components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      padding: theme.spacing(2),
    },
  },
  table: {
    "& td": { border: 0 },
  },
}));

function SellBoxpileDialog(props) {
  const classes = useStyles(props);
  const { dialog } = props;
  const { data } = dialog;
  const [form, setForm] = useState({
    amount: 0,
    ipoId: dialog?.data?.id,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (dialog.data) setForm((state) => ({ ...state, ipoId: dialog.data?.id }));
    return () => {};
  }, [dialog.data]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  console.log(dialog, "dialog sell bocxplies");
  console.log(form, "form sell dialog");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeSellSublotDialog())}
      aria-labelledby="bid-boxpile-payment"
    >
      <DialogTitle>Sell Boxpile</DialogTitle>
      <DialogContent>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-4">
          <dt className="text-sm font-medium text-gray-500">Property ID</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {data?.property.propertyRef}
          </dd>
          <dt className="text-sm font-medium text-gray-500">Market Price</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {data && BoxUtils.formatCurrency(data?.property?.price)}
          </dd>
          <dt className="text-sm font-medium text-gray-500">
            Purchased Amount ( {data?.noOfUnitsPurchased} units )
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {data && BoxUtils.formatCurrency(data?.purchaseAmount)}
          </dd>
        </div>

        <div className="flex flex-col items-center">
          <TextField
            id="selling-price"
            label="Selling Price"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-56" }}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmSaleDialog(form))}
        >
          Sell Boxpile
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ ipostakesReducer }) => {
  return {
    dialog: ipostakesReducer.ipostakes.sellSublotDialog,
  };
};

export default withReducer(
  "ipostakesReducer",
  reducer
)(connect(mapStateToProps, null)(SellBoxpileDialog));
