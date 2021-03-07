import React, { useState } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import { useDispatch, connect } from "react-redux";
import withReducer from "./../../../../store/withReducer";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../../common/components";
import {
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
      paddingBottom: theme.spacing(2),
    },
  },
}));

function BuyIpoStakeDialog(props) {
  const classes = useStyles(props);
  const { dialog } = props;
  const { data } = dialog;
  const [form, setForm] = useState({
    purchaseAmount: 0,
    unitsPurchased: 0,
  });
  const dispatch = useDispatch();

  console.log(dialog, "dialog buy boxpile shit");
  console.log(form, "form buy boxpile shit");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
      purchaseAmount: data
        ? (data.price / data.units) * Number(event.target.value)
        : 0,
    });
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeIpoStakeDialog())}
      aria-labelledby="buy-boxpile"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Buy Boxpile</DialogTitle>
      <DialogContent>
        <div className="text-center px-4">
          <h3 className="text-sm font-medium text-gray-600">
            Number of Available Units :{" "}
            <span>{data && data.unitsAvailable}</span>
          </h3>
          <h4 className="text-sm font-normal text-gray-600 my-4">
            Make your Offer
          </h4>
          <span className="flex flex-wrap justify-center items-center gap-4 mt-8">
            <div>
              <TextField
                id="units-purchased"
                name="unitsPurchased"
                label="Number of Units"
                value={form.unitsPurchased}
                onChange={handleChange}
                variant="outlined"
                size="small"
                helperText={
                  form.unitsPurchased > data?.unitsAvailable
                    ? "Units can not be above the available units"
                    : ""
                }
                fullWidth
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs">Amount</span>
              <Typography color="secondary">
                {BoxUtils.formatCurrency(form.purchaseAmount)}
              </Typography>
            </div>
          </span>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          variant="contained"
          disabled={form.unitsPurchased > data?.unitsAvailable}
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmNewIpoStakeDialog(form))}
        >
          Buy
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ boxpileReducer }) => {
  return {
    dialog: boxpileReducer.boxpiles.boxpileDialog,
  };
};

export default withReducer(
  "boxpileReducer",
  reducer
)(connect(mapStateToProps, null)(BuyIpoStakeDialog));
