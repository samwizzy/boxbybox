import React, { useState, useEffect } from "react";
import BoxUtils from "./../../../utils/BoxUtils";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withReducer from "../../../store/withReducer";
import * as Actions from "./../store/actions";
import * as authActions from "../../../auth/store/actions";
import reducer from "./../store/reducers";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton, GoBackButton } from "./../../../common/components";
import {
  Card,
  CardActions,
  CircularProgress,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Step1 from "./forms/Step1";
import Step2 from "./forms/Step2";
import Step3 from "./forms/Step3";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1, 0),
    "& .MuiCardActions-root": { justifyContent: "flex-end" },
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return ["Add property details", "Upload Property files", "Make payment"];
}

function UploadProperty(props) {
  const classes = useStyles(props);
  const {
    loading,
    getCountries,
    countries,
    states,
    lgas,
    addProperty,
    getStateByCountry,
    getLgaByState,
  } = props;
  const [form, setForm] = useState({ ...props.form });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm({ ..._.set(form, name, type === "checkbox" ? checked : value) });
  };

  const canBeSubmitted = () => {
    return _.some(form, _.isNull);
  };

  const handleImageUpload = (files) => {
    let images = [];
    files.map((file) => {
      return BoxUtils.toBase64(file).then((data) => {
        images.push({
          encodedString: data,
          extension: file.type.split("/")[1],
        });
      });
    });

    setForm({ ...form, images });
  };

  useEffect(() => {
    getCountries();
    return () => {};
  }, [getCountries]);

  const handleSubmit = () => {
    addProperty(form);
  };

  console.log(activeStep, "activeStep");
  console.log(steps.length - 1, "steps lengthss");
  console.log(form, "form");
  console.log(countries, "countries");

  return (
    <div className="container">
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Toolbar className={classes.toolbar}>
                <GoBackButton />
                <h3 className="text-lg text-gray-600 ml-2">Upload Property</h3>
              </Toolbar>

              <div className="grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4">
                {activeStep === steps.length ? (
                  <div>
                    <Typography>All steps completed</Typography>
                    <AppButton onClick={handleReset}>Reset</AppButton>
                  </div>
                ) : (
                  <div>
                    {activeStep === 0 && (
                      <Step1
                        countries={countries}
                        states={states}
                        lgas={lgas}
                        getStateByCountry={getStateByCountry}
                        getLgaByState={getLgaByState}
                        form={form}
                        handleChange={handleChange}
                      />
                    )}
                    {activeStep === 1 && (
                      <Step2
                        form={form}
                        handleImageUpload={handleImageUpload}
                      />
                    )}
                    {activeStep === 2 && (
                      <Step3 form={form} handleChange={handleChange} />
                    )}

                    <Card className={classes.card}>
                      <CardActions>
                        <AppButton
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </AppButton>
                        <AppButton
                          variant="contained"
                          color="secondary"
                          disabled={
                            loading ||
                            (canBeSubmitted() &&
                              activeStep === steps.length - 1)
                          }
                          onClick={
                            activeStep === steps.length - 1
                              ? handleSubmit
                              : handleNext
                          }
                          startIcon={loading && <CircularProgress size={20} />}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </AppButton>
                      </CardActions>
                    </Card>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ propertyUpload, auth }) => {
  return {
    loading: propertyUpload.property.loading,
    form: propertyUpload.property.form,
    countries: auth.location.countries,
    states: auth.location.states,
    lgas: auth.location.lgas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCountries: authActions.getCountries,
      getStateByCountry: authActions.getStateByCountry,
      getLgaByState: authActions.getLgaByState,
      addProperty: Actions.addProperty,
    },
    dispatch
  );
};

export default withReducer(
  "propertyUpload",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadProperty)));
