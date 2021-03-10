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

function ConfirmIpoStakeDialog(props) {
  const classes = useStyles();
  const { dialog, property } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  console.log(property, "property ipo stake dialog");
  console.log(dialog, "dialog confirm ipo stake dialog");

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeConfirmNewIpoStakeDialog())}
      aria-labelledby="confirm-ipo-stake"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            You are about to purchase a boxpile on {property?.title}.
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
          disabled={!dialog.data}
          variant="contained"
          color="secondary"
          onClick={() =>
            dispatch(Actions.addIpoStake(dialog.data, property.id))
          }
        >
          Confirm purchase
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ boxpileReducer }) => {
  return {
    dialog: boxpileReducer.boxpiles.confirmNewBoxpileDialog,
    property: boxpileReducer.property.property,
  };
};

export default withReducer(
  "boxpileReducer",
  reducer
)(connect(mapStateToProps, null)(ConfirmIpoStakeDialog));
