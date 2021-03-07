import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import withReducer from "./../../../../store/withReducer";
import * as Actions from "./../../store/actions";
import reducer from "./../../store/reducers";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../../common/components";
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

function ConfirmSellDialog(props) {
  const classes = useStyles();
  const { dialog, putIpoStakeForSale } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  console.log(dialog, "confirm sale dialog");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeConfirmSaleDialog())}
      aria-labelledby="confirm-boxpile-sale"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            You are about to sell this <em>Boxpile</em>
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
          onClick={() => putIpoStakeForSale(dialog.data)}
        >
          Confirm Sale
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ ipostakesReducer }) => {
  return {
    dialog: ipostakesReducer.ipostakes.confirmSaleDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      putIpoStakeForSale: Actions.putIpoStakeForSale,
    },
    dispatch
  );
};

export default withReducer(
  "ipostakesReducer",
  reducer
)(connect(mapStateToProps, mapDispatchToProps)(ConfirmSellDialog));
