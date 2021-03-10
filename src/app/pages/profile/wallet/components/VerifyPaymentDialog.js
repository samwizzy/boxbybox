import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { AppButton } from "./../../../../common/components";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { usePaystackPayment } from "react-paystack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
}));

function VerifyPaymentDialog(props) {
  const classes = useStyles(props);
  const [paymentGateway, setPaymentGateway] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { paymentGateways } = props;
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user.data);
  const dialog = useSelector(
    ({ profileWallet }) => profileWallet.wallet.verifyPaymentDialog
  );

  const initialConfig = {
    reference: new Date().getTime(),
    email: user?.email,
    amount: 0,
    publicKey: "",
  };

  const [config, setConfig] = useState({ ...initialConfig });

  useEffect(() => {
    if (dialog.data) {
      let publicKey = "";
      if (paymentGateway) {
        publicKey = paymentGateway.publicKey.split(" ")[1];
      }
      setConfig((state) => ({
        ...state,
        email: user.email,
        reference: dialog.data.transactionReference,
        amount: dialog.data.totalAmount * 100,
        publicKey: publicKey,
      }));
    }

    return () => {};
  }, [dialog.data, user, paymentGateway]);

  const onSuccess = ({ reference }) => {
    dispatch(Actions.verifyPayment(reference, paymentGateway.name));
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
          disabled={!paymentGateway}
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          verify {paymentGateway && `with ${paymentGateway.name}`}
        </AppButton>
      </div>
    );
  };

  const handleChange = (event, value) => {
    console.log(value, "value");
    setPaymentGateway(value);
  };

  console.log(dialog, "verify dialog");
  console.log(user, "auth dialog");
  console.log(config, "config dialog");
  console.log(paymentGateway, "verify paymentGateway");
  console.log(inputValue, "verify inputValue");

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

          <Autocomplete
            value={paymentGateway}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="select-payment-gateway"
            options={paymentGateways}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Payment Gateway"
                variant="outlined"
                margin="dense"
              />
            )}
            fullWidth
          />
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
