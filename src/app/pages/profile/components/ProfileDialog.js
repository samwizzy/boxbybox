import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../store/actions";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../common/components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Radio,
  RadioGroup,
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
  const data = useSelector(({ auth }) => auth.register.data);
  const [form, setForm] = useState({ ...data });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((state) => ({
      ..._.set(state, name, type === "checkbox" ? checked : value),
    }));
  };

  console.log(form, "form data profile dialog");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeProfileDialog())}
      aria-labelledby="profile-update"
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
          <TextField
            id="phone-number"
            label="Phone Number"
            name="phoneNumber"
            value=""
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              aria-label="gender"
              name="individualUser.gender"
              value={form.individualUser.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              <FormControlLabel
                value="FEMALE"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <div className="place-self-start">
            <FormLabel>Next of Kin Details</FormLabel>
          </div>

          <TextField
            margin="dense"
            id="individual-next-of-kin-name"
            name="individualUser.nextOfKinName"
            label="Name"
            value={form.individualUser.nextOfKinName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="individual-next-of-kin-email"
            name="individualUser.nextOfKinEmail"
            label="Email"
            type="email"
            value={form.individualUser.nextOfKinEmail}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="individual-next-of-kin-phone"
            name="individualUser.nextOfKinPhone"
            label="Phone"
            value={form.individualUser.nextOfKinPhone}
            onChange={handleChange}
            variant="outlined"
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
