import React from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
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
      paddingBottom: theme.spacing(4),
    },
  },
}));

function QueueInBidDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ bidDetail }) => bidDetail.bids.queueInBidDialog
  );

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeQueueInBidDialog())}
      aria-labelledby="bid-offers-payment"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Queue in Bid</DialogTitle>
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-sm font-medium text-gray-600">
            Number of Units : <span>100000</span>
          </h3>
          <h4 className="text-sm font-normal text-gray-600 my-4">
            Make your Offer
          </h4>
          <span className="flex justify-between items-center gap-6 mt-8">
            <div>
              <TextField
                label="Number of Units"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs">Amount</span>
              <Typography color="secondary">
                {BoxUtils.formatCurrency(5000000)}
              </Typography>
            </div>
          </span>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmBidDialog())}
        >
          Bid
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QueueInBidDialog;
