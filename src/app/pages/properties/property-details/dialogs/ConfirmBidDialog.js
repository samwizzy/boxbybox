import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import withReducer from "./../../../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../../common/components";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
}));

function ConfirmBidDialog(props) {
  const classes = useStyles();
  const { dialog } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  console.log(dialog.data, "ConfirmBidDialog diakog");

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeConfirmBidDialog())}
      aria-labelledby="bid-offers-payment"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            You are about to submit a bid.
          </h3>
          <span className="mt-8 text-xs">
            <FormControlLabel
              control={
                <Checkbox
                  checked={state}
                  onChange={handleChange}
                  name="agree"
                />
              }
              label={
                <span className="text-sm">I agree to the Terms of Service</span>
              }
            />
          </span>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.bidForIpoStake(dialog.data))}
        >
          Confirm bid
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ bidReducer }) => {
  return {
    dialog: bidReducer.bids.confirmBidDialog,
  };
};

export default withReducer(
  "bidReducer",
  reducer
)(connect(mapStateToProps, null)(ConfirmBidDialog));
