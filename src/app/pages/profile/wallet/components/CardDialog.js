import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
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
  table: {
    "& td": { border: 0 },
  },
}));

function CardDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileWallet }) => profileWallet.wallet.cardDialog
  );

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeNewCardDialog())}
      aria-labelledby="payment-card-form"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="flex flex-col items-center space-y-4">
          <TextField
            id="card-number"
            label="Card Number"
            name="cardNumber"
            value=""
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <div className="flex items-center space-x-2">
            <TextField
              id="exp-date"
              label="Exp. Date"
              name="expDate"
              value=""
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="cvv"
              label="Cvv"
              name="cvv"
              value=""
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.closeNewCardDialog())}
        >
          Add Card
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default CardDialog;
