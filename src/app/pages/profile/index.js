import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import withReducer from "../../store/withReducer";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import _ from "lodash";
import moment from "moment";
import { AppButton } from "../../common/components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Toolbar,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import EditIcon from "@material-ui/icons/Edit";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileDialog from "./components/ProfileDialog";

const useStyles = makeStyles((theme) => ({
  card: {
    "& .MuiCardHeader-root": {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.grey[200],
      alignItems: "center",
      "& .MuiCardHeader-action": { marginTop: 0 },
    },
  },
  toolbar: { backgroundColor: theme.palette.background.paper },
}));

function ProfileApp(props) {
  const classes = useStyles(props);
  const { openProfileDialog } = props;
  const user = useSelector(({ auth }) => auth.user.data);
  const countries = useSelector(({ auth }) => auth.location.countries);

  return (
    <div className="container bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProfileSidebar />
          </Grid>
          <Grid item xs={12} md={8}>
            <Toolbar className={classes.toolbar}>
              <h3 className="text-lg text-gray-600">Profile Details</h3>
            </Toolbar>

            <div className="space-y-4">
              <Card className={classes.card}>
                <CardHeader
                  disableTypography
                  title="Personal Info"
                  action={
                    <AppButton
                      startIcon={<EditIcon />}
                      onClick={openProfileDialog}
                    >
                      edit
                    </AppButton>
                  }
                />
                <CardContent>
                  <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-6 px-8">
                    <div className="space-y-4">
                      <section>
                        <h3 className="text-sm text-gray-600">Name</h3>
                        <span className="text-gray-600">
                          {user.individualUser ? (
                            user.individualUser.fullName
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">Email</h3>
                        <span className="text-gray-600">
                          {user ? user.email : <Skeleton />}
                        </span>
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">Age</h3>
                        {user.individualUser ? (
                          <span className="text-gray-600">
                            {moment().diff(
                              moment(user.individualUser.dateOfBirth, [
                                "DD-MM-YYYY",
                              ]),
                              "year"
                            )}{" "}
                            years
                          </span>
                        ) : (
                          <Skeleton />
                        )}
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">Nationality</h3>
                        <span className="text-gray-600">
                          {countries.length && user.individualUser ? (
                            _.find(countries, {
                              id: Number(user.individualUser.address.country),
                            }).name
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </section>
                    </div>
                    <div className="space-y-4 mt-4 md:mt-0">
                      <section>
                        <h3 className="text-sm text-gray-600">Phone Number</h3>
                        <span className="text-gray-600">
                          {user ? user.phone : <Skeleton />}
                        </span>
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">Address</h3>
                        {user.individualUser && countries.length ? (
                          <span className="text-gray-600">
                            {user.individualUser.address.houseNoAddress}
                            {", "}
                            {user.individualUser.address.city}{" "}
                            {
                              _.find(countries, {
                                id: Number(user.individualUser.address.country),
                              }).name
                            }
                          </span>
                        ) : (
                          <Skeleton />
                        )}
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">Sex</h3>
                        <span className="text-gray-600">
                          {user.individualUser ? (
                            user.individualUser.gender
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">
                          {user.company && "Company"}
                        </h3>
                        <span className="text-gray-600">
                          {user.company ? user.company.name : ""}
                        </span>
                      </section>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={classes.card}>
                <CardHeader
                  disableTypography
                  title="Next of Kin"
                  action={
                    <AppButton
                      startIcon={<EditIcon />}
                      onClick={openProfileDialog}
                    >
                      edit
                    </AppButton>
                  }
                />
                <CardContent>
                  <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-6 px-8">
                    <div className="space-y-4">
                      <section>
                        <h3 className="text-sm text-gray-600">Name</h3>
                        <span className="text-gray-600">
                          {user.individualUser ? (
                            user.individualUser.nextOfKinName
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </section>
                      <section>
                        <h3 className="text-sm text-gray-600">Email</h3>
                        <span className="text-gray-600">
                          {user.individualUser ? (
                            user.individualUser.nextOfKinEmail
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </section>
                    </div>
                    <div className="space-y-4 mt-4 md:mt-0">
                      <section>
                        <h3 className="text-sm text-gray-600">Phone Number</h3>
                        <span className="text-gray-600">
                          {user.individualUser ? (
                            user.individualUser.nextOfKinPhone
                          ) : (
                            <Skeleton />
                          )}
                        </span>
                      </section>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>

        <ProfileDialog />
      </div>
    </div>
  );
}

const mapStateToProps = ({ profileApp }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      openProfileDialog: Actions.openProfileDialog,
      getProperties: Actions.getProperties,
    },
    dispatch
  );
};

export default withReducer(
  "profileApp",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileApp)));
