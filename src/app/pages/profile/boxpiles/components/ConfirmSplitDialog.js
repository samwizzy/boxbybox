import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
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

function ConfirmSplitDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const dialog = useSelector(
    ({ boxpilesReducer }) => boxpilesReducer.ipostakes.confirmSplitDialog
  );

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  console.log(dialog, "dialog split");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeConfirmSplitDialog())}
      aria-labelledby="boxpile-split"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            You are about to split this Boxpile
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
          onClick={() => dispatch(Actions.splitIpoStake(dialog?.data?.id))}
        >
          Confirm Split
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmSplitDialog;
