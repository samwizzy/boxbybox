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

function CounterBidDialog(props) {
  const classes = useStyles(props);
  const { dialog } = props;
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    amount: 0,
    ipoBidId: dialog?.data?.id,
  });

  useEffect(() => {
    if (dialog.data)
      setForm((state) => ({ ...state, ipoBidId: dialog.data?.id }));
    return () => {};
  }, [dialog.data]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  console.log(dialog, "dialog counter bid");
  console.log(form, "form sell counter bid");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeCounterBidDialog())}
      aria-labelledby="bid-countering"
    >
      <DialogTitle>Counter Bid</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Current Bid Amount:</span>
            <h3 className="text-gray-600 text-lg">
              {dialog.data && BoxUtils.formatCurrency(dialog.data?.bidAmount)}
            </h3>
          </div>
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
          onClick={() => dispatch(Actions.counterBid(form))}
        >
          Counter bid
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ bidsReducer }) => {
  return {
    dialog: bidsReducer.bids.counterBidDialog,
  };
};

export default withReducer(
  "bidsReducer",
  reducer
)(connect(mapStateToProps, null)(CounterBidDialog));
