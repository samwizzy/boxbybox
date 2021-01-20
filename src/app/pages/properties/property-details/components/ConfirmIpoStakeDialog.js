import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
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

function ConfirmIpoStakeDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const dialog = useSelector(
    ({ propertyDetails }) => propertyDetails.ipostakes.confirmIpoStakeDialog
  );
  const property = useSelector(
    ({ propertyDetails }) => propertyDetails.property.property
  );

  console.log(property, "property ipo stake dialog");
  console.log(dialog, "dialog confirm ipo stake dialog");

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeConfirmIpoStakeDialog())}
      aria-labelledby="confirm-ipo-stake"
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
          size="small"
          disabled={!dialog.data}
          variant="contained"
          color="secondary"
          onClick={() =>
            dispatch(Actions.addIpoStake(dialog.data, property.id))
          }
        >
          Confirm bid on ipo stake
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmIpoStakeDialog;
