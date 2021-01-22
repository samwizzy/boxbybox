import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../common/components";
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
      justifyContent: "flex-end",
      padding: theme.spacing(3),
    },
  },
}));

function ProfileDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileApp }) => profileApp.profile.profileDialog
  );

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeProfileDialog())}
      aria-labelledby="merge-subslots"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center space-y-4">
          <TextField
            id="fullname"
            label="Full name"
            name="fullName"
            value=""
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            value=""
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="outlined"
          onClick={() => dispatch(Actions.closeProfileDialog())}
        >
          Close
        </AppButton>
        <AppButton size="small" variant="contained" color="secondary">
          Update
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileDialog;
