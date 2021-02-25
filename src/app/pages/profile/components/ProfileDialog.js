import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getStateByCountry,
  getLgaByState,
} from "./../../../auth/store/actions";
import * as Actions from "./../store/actions";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../common/components";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormLabel,
  MenuItem,
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
  const profile = useSelector(({ profileReducer }) => profileReducer.profile);
  const user = useSelector(({ auth }) => auth.user.data);
  const location = useSelector(({ auth }) => auth.location);
  const { countries, states, lgas } = location;

  const { loading, profileDialog: dialog, formModel } = profile;
  const [form, setForm] = useState({ ...formModel });

  useEffect(() => {
    if (user.role) {
      setForm({ ...user });
    }
  }, [user]);

  useEffect(() => {
    if (form.role === "COMPANY") {
      dispatch(getStateByCountry(form.company.address.country));
    } else if (form.individualUser.address.country) {
      dispatch(getStateByCountry(form.individualUser.address.country));
    }

    return () => {
      // setForm((state) => _.set(state, "individualUser.address.state", ""));
      console.log("i am also triggered becaiuse of the dispatch");
    };
  }, [dispatch, form.individualUser.address.country, form.company, form.role]);

  useEffect(() => {
    if (form.role === "COMPANY") {
      dispatch(getLgaByState(form.company.address.state));
    } else if (form.individualUser.address.state) {
      dispatch(getLgaByState(form.individualUser.address.state));
    }

    return () => {
      setForm((state) => _.set(state, "individualUser.address.lga", ""));
    };
  }, [dispatch, form.role, form.individualUser.address.state, form.company]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((state) => ({
      ..._.set(state, name, type === "checkbox" ? checked : value),
    }));
  };

  const handleDateChange = (name) => (date) => {
    setForm({
      ..._.set(form, name, moment(date, ["DD-MM-YYYY"]).format("DD-MM-YYYY")),
    });
  };

  const handleSubmit = () => {
    dispatch(Actions.updateProfile(form));
  };

  console.log(form, "form data profile dialog");
  console.log(user, "user profile dialog");
  console.log(location, "location auth dialog");

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
            name="individualUser.fullName"
            value={form.individualUser.fullName}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="phone-number"
            label="Phone Number"
            name="phoneNumber"
            value={form.phone}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            fullWidth
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              format="dd MMMM yyyy"
              minDate="1980-01-01"
              id="date-of-birth"
              label="Date of Birth"
              onChange={handleDateChange("individualUser.dateOfBirth")}
              value={moment(form.individualUser.dateOfBirth, [
                "DD-MM-YYYY",
              ]).format("YYYY-MM-DD")}
              variant="inline"
              inputVariant="outlined"
              margin="dense"
              fullWidth
            />
          </MuiPickersUtilsProvider>

          <div className="place-self-start">
            <FormLabel>Location Info</FormLabel>
          </div>

          <TextField
            margin="dense"
            id="individual-select-country"
            name="individualUser.address.country"
            select
            label="Country"
            value={form.individualUser.address.country}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select country</MenuItem>
            {countries.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="individual-select-state"
            name="individualUser.address.state"
            select
            label="State"
            value={form.individualUser.address.state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select state</MenuItem>
            {states.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="individual-select-lga"
            name="individualUser.address.lga"
            select
            label="LGA"
            value={form.individualUser.address.lga}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select lga</MenuItem>
            {lgas.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="individual-house-no-address"
            name="individualUser.address.houseNoAddress"
            label="House No."
            value={form.individualUser.address.houseNoAddress}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            margin="dense"
            id="individual-city"
            name="individualUser.address.city"
            label="City"
            value={form.individualUser.address.city}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            margin="dense"
            id="individual-latitude"
            name="individualUser.address.latitude"
            label="Latitude"
            type="number"
            value={form.individualUser.address.latitude}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            margin="dense"
            id="individual-longitude"
            name="individualUser.address.longitude"
            label="Longitude"
            type="number"
            value={form.individualUser.address.longitude}
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
        <AppButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          Update
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileDialog;
