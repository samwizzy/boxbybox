import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import clsx from "clsx";
import _ from "lodash";
import * as authActions from "../../../auth/store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AppButton } from "./../../../common/components";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundImage: "url(assets/images/auth/screen.svg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function Register(props) {
  const classes = useStyles(props);
  const {
    countries,
    states,
    lgas,
    data,
    getStateByCountry,
    getLgaByState,
  } = props;
  const [form, setForm] = useState({ ...data });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (form.role === "COMPANY" && form.company.address.country) {
      getStateByCountry(form.company.address.country);
    } else if (
      form.role === "INDIVIDUAL_USER" &&
      form.individualUser.address.country
    ) {
      getStateByCountry(form.individualUser.address.country);
    }
  }, [
    form.role,
    form.company.address.country,
    form.individualUser.address.country,
    getStateByCountry,
  ]);

  useEffect(() => {
    if (form.role === "COMPANY" && form.company.address.state) {
      getLgaByState(form.company.address.state);
    } else if (
      form.role === "INDIVIDUAL_USER" &&
      form.individualUser.address.state
    ) {
      getLgaByState(form.individualUser.address.state);
    }
  }, [
    form.role,
    form.company.address.state,
    form.individualUser.address.state,
    getLgaByState,
  ]);

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

  const validatePassword = (e) => {
    setConfirmPassword(e.target.value);
    if (form.password !== e.target.value) {
      setError((state) => ({
        ...state,
        [e.target.name]: "Password does not match",
      }));
    } else {
      setError((state) => ({
        ...state,
        [e.target.name]: "",
      }));
    }
  };

  console.log(form, "register form");

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className={clsx(classes.screen, "flex screen")}></div>
        <div className="">
          <div className="space-y-4">
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                aria-label="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="INDIVIDUAL_USER"
                  control={<Radio />}
                  label="Private Individual"
                />
                <FormControlLabel
                  value="COMPANY"
                  control={<Radio />}
                  label="Company"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="space-y-4">
            <AppButton
              className="w-full"
              variant="outlined"
              color="secondary"
              startIcon={
                <img
                  className="h-4"
                  src="assets/images/social/facebook-blue.svg"
                  alt=""
                />
              }
            >
              Login with Facebook
            </AppButton>
            <AppButton
              className="w-full mb-2"
              variant="outlined"
              color="secondary"
              startIcon={
                <img
                  className="h-4"
                  src="assets/images/social/google.svg"
                  alt=""
                />
              }
            >
              Login with Google
            </AppButton>
          </div>

          <div className="mt-2 space-y-4">
            <TextField
              autoFocus
              margin="dense"
              id="administrator.fullName"
              name="administrator.fullName"
              label="Name"
              value={form.administrator.fullName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="email-address"
              name="email"
              label="Email Address"
              value={form.email}
              onChange={handleChange}
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="phone-number"
              name="phone"
              label="Phone number"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              type="password"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={validatePassword}
              type="password"
              variant="outlined"
              fullWidth
              helperText={
                <span className="text-sm text-red-800">
                  {error.confirmPassword || ""}
                </span>
              }
            />

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {form.role === "COMPANY"
                    ? "Company Details"
                    : "Individual Details"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {form.role === "COMPANY" ? (
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          id="name"
                          name="company.name"
                          label="Name"
                          value={form.company.name}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          id="rcNumber"
                          name="company.rcNumber"
                          label="RC Number"
                          value={form.company.rcNumber}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="company-country-select"
                          name="company.address.country"
                          select
                          label="Country"
                          value={form.company.address.country}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        >
                          {countries.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="company-select-state"
                          name="company.address.state"
                          select
                          label="State"
                          value={form.company.address.state}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        >
                          {states.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          id="company-select-lga"
                          name="company.address.lga"
                          select
                          label="LGA"
                          value={form.company.address.lga}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        >
                          {lgas.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="house-no-address"
                          name="company.address.houseNoAddress"
                          label="House No."
                          value={form.company.address.houseNoAddress}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="city"
                          name="company.address.city"
                          label="City"
                          value={form.company.address.city}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="latitude"
                          name="company.address.latitude"
                          label="Latitude"
                          value={form.company.address.latitude}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="longitude"
                          name="company.address.longitude"
                          label="Longitude"
                          value={form.company.address.longitude}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="fullname"
                          name="individualUser.fullName"
                          label="Name"
                          value={form.individualUser.fullName}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            autoOk
                            format="dd MMMM yyyy"
                            minDate="1980-01-01"
                            id="date-of-birth"
                            label="Date of Birth"
                            onChange={handleDateChange(
                              "individualUser.dateOfBirth"
                            )}
                            value={moment(form.individualUser.dateOfBirth, [
                              "DD-MM-YYYY",
                            ]).format("YYYY-MM-DD")}
                            variant="inline"
                            inputVariant="outlined"
                            margin="dense"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl component="fieldset" fullWidth>
                          <RadioGroup
                            aria-label="gender"
                            name="individualUser.gender"
                            value={form.individualUser.gender}
                            onChange={handleChange}
                            row
                          >
                            <FormControlLabel
                              value="MALE"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="FEMALE"
                              control={<Radio />}
                              label="Female"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="individual-latitude"
                          name="individualUser.address.latitude"
                          label="Latitude"
                          value={form.individualUser.address.latitude}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="individual-longitude"
                          name="individualUser.address.longitude"
                          label="Longitude"
                          value={form.individualUser.address.longitude}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormLabel>Next of Kin Details</FormLabel>
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="dense"
                          id="individual-next-of-kin-email"
                          name="individualUser.nextOfKinEmail"
                          label="Email"
                          value={form.individualUser.nextOfKinEmail}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                    </Grid>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>

            <AppButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => props.registerUser(form)}
            >
              Register
            </AppButton>

            <div className="lg:text-center space-x-1">
              <span className="text-xs text-gray-600">
                Don't have an account?
              </span>
              <a className="text-xs text-blue-" href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    countries: auth.location.countries,
    states: auth.location.states,
    lgas: auth.location.lgas,
    data: auth.register.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      registerUser: authActions.register,
      getCountries: authActions.getCountries,
      getStateByCountry: authActions.getStateByCountry,
      getLgaByState: authActions.getLgaByState,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
