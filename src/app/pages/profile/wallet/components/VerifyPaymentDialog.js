import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, TextField } from "@material-ui/core";
import { AppButton } from "./../../../../common/components";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { usePaystackPayment } from "react-paystack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
}));

const initialConfig = {
  reference: new Date().getTime(),
  email: "samwize.inc@gmail.com",
  amount: 20000,
  publicKey: "pk_test_954d6c42ded371fec6455bde2d41638268324803",
};

function VerifyPaymentDialog(props) {
  const classes = useStyles(props);
  const [paymentGateway, setPaymentGateway] = useState("PAYSTACK");
  const { paymentGateways } = props;
  const [config, setConfig] = useState({ ...initialConfig });
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileWallet }) => profileWallet.wallet.verifyPaymentDialog
  );

  useEffect(() => {
    if (dialog.data) {
      setConfig((state) => ({
        ...state,
        reference: dialog.data.transactionReference,
        amount: dialog.data.totalAmount * 100,
      }));
    }
    return () => {};
  }, [dialog.data]);

  const onSuccess = ({ reference }) => {
    console.log(reference, "reference on success");
    dispatch(Actions.verifyPayment(reference, paymentGateway));
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    dispatch(Actions.closeVerifyPaymentDialog());
  };

  const PaystackButton = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <AppButton
          variant="contained"
          color="primary"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          verify with {paymentGateway}
        </AppButton>
      </div>
    );
  };

  const handleChange = (event) => {
    setPaymentGateway(event.target.value);
  };

  console.log(dialog, "verify dialog");
  console.log(config, "config dialog");
  console.log(paymentGateway, "verify paymentGateway");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeVerifyPaymentDialog())}
      aria-labelledby="verify-payment"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="flex flex-col items-center space-y-4 py-8">
          <p className="text-base text-gray-600">
            You are about to verify fund wallet
          </p>

          <TextField
            id="payment-method"
            select
            label="Payment Method"
            name="paymentMethod"
            value={paymentGateway}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            fullWidth
          >
            <MenuItem value="">Select Payment method</MenuItem>
            {paymentGateways.map((pay, i) => (
              <MenuItem key={i} value={pay.name}>
                {pay.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          variant="outlined"
          onClick={() => dispatch(Actions.closeVerifyPaymentDialog())}
        >
          Cancel
        </AppButton>
        <PaystackButton />
      </DialogActions>
    </Dialog>
  );
}

export default VerifyPaymentDialog;
