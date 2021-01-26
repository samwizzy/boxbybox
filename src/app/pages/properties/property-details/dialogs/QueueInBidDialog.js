import React, { useState, useEffect } from "react";
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
  MenuItem,
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

function QueueInBidDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const bids = useSelector(({ propertyDetails }) => propertyDetails.bids);
  const dialog = bids.queueInBidDialog;
  const [form, setForm] = useState({
    amount: 0,
    propertyId: 0,
    units: 0,
  });

  // console.log(dialog, "queue in bid shit dialog");
  // console.log(bids, "queue in bid shit units");
  // console.log(form, "queue in bid shit form");

  useEffect(() => {
    if (dialog.data) {
      // setForm((state) => ({ ...state, propertyId: dialog.data.id }));
      dispatch(Actions.getAvailableUnits(dialog.data.id));
    }
  }, [dispatch, dialog]);

  useEffect(() => {
    if (form.units && dialog.data) {
      dispatch(Actions.getMinCostOfUnit(dialog.data.id, form.units));
    }
  }, [dispatch, form.units, dialog]);

  useEffect(() => {
    if (bids.minimumCostForUnit) {
      setForm((state) => ({
        ...state,
        amount: bids.minimumCostForUnit.bidCost,
        propertyId: bids.minimumCostForUnit.propertyId,
      }));
    }
  }, [bids.minimumCostForUnit]);

  useEffect(() => {
    return () => {};
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeQueueInBidDialog())}
      aria-labelledby="bid-offers-payment"
    >
      <DialogTitle>Queue in Bid</DialogTitle>
      <DialogContent>
        <div className="text-center px-4">
          <h3 className="text-sm font-medium text-gray-600">
            Number of Units : <span>{dialog.data && dialog.data.units}</span>
          </h3>
          <h4 className="text-sm font-normal text-gray-600 my-4">
            Make your Offer
          </h4>
          <span className="flex justify-between items-center gap-6 mt-8">
            <div>
              <TextField
                id="select-units"
                select
                label="Number of Units"
                name="units"
                value={form.units}
                variant="outlined"
                onChange={handleChange}
                size="small"
                style={{ minWidth: "120px" }}
                fullWidth
              >
                <MenuItem value="0">Select available units</MenuItem>
                {bids.units.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex flex-col">
              <span className="text-xs">Amount</span>
              <Typography color="secondary">
                {bids.minimumCostForUnit
                  ? BoxUtils.formatCurrency(bids.minimumCostForUnit.bidCost)
                  : 0}
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
          onClick={() => dispatch(Actions.openConfirmBidDialog(form))}
        >
          Queue Bid
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default QueueInBidDialog;
