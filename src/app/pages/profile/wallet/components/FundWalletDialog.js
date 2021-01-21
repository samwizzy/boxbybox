import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
  table: {
    "& td": { border: 0 },
  },
}));

function FundWalletDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileWallet }) => profileWallet.wallet.fundWalletDialog
  );

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeFundWalletDialog())}
      aria-labelledby="merge-subslots"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="flex flex-col items-center space-y-4">
          <TextField
            id="amount"
            label="Amount"
            name="amount"
            value=""
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="payment-method"
            select
            label="Payment Method"
            name="paymentMethod"
            value=""
            variant="outlined"
            margin="dense"
            fullWidth
          >
            <MenuItem value="">Payment method</MenuItem>
          </TextField>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          size="small"
          onClick={() => dispatch(Actions.closeFundWalletDialog())}
        >
          Close
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Fund
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FundWalletDialog;
