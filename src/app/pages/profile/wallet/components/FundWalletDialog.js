import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../../common/components";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
}));

function FundWalletDialog(props) {
  const classes = useStyles(props);
  const [form, setForm] = useState({
    amount: 0,
    purposeOfPayment: "WALLET_FUNDING",
  });

  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileWallet }) => profileWallet.wallet.fundWalletDialog
  );

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(Actions.registerTransaction(form));
  };

  console.log(form, "fund wallet form");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeFundWalletDialog())}
      aria-labelledby="fund-wallet"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="flex flex-col items-center space-y-4 py-8">
          <TextField
            id="amount"
            label="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          variant="outlined"
          onClick={() => dispatch(Actions.closeFundWalletDialog())}
        >
          Close
        </AppButton>
        <AppButton variant="contained" color="secondary" onClick={handleSubmit}>
          Fund
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default FundWalletDialog;
