import React, { useState } from "react";
import clsx from "clsx";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../../auth/store/actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { AppButton } from "./../../../common/components";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlined from "@material-ui/icons/VisibilityOffOutlined";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundImage: "url(assets/images/auth/screen.svg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

export function Login(props) {
  const classes = useStyles(props);
  const { loading, data, login, handleTabChange } = props;
  const [form, setForm] = useState({ ...data });
  const [visibility, setVisibility] = useState(false);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleChange = (event) => {
    setForm((state) => ({
      ..._.set(state, event.target.name, event.target.value),
    }));
  };

  const canBeSubmitted = () => {
    return _.some(form, _.isEmpty);
  };

  console.log(data, "data login");
  console.log(form, "form login");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={clsx(classes.screen, "hidden md:flex")}></div>
        <div>
          <div className="space-y-4 mb-2">
            <AppButton
              fullWidth
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
              fullWidth
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
              id="email"
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
              id="password"
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title={visibility ? "hide password" : "show password"}
                    arrow
                  >
                    <IconButton onClick={handleVisibility} size="small">
                      {visibility ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </Tooltip>
                ),
              }}
              type={visibility ? "text" : "password"}
              variant="outlined"
              fullWidth
            />
            <AppButton
              title="login"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => login(form)}
              disabled={canBeSubmitted()}
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
            >
              Login
            </AppButton>

            <div className="lg:text-center space-x-1">
              <span className="text-xs text-gray-600">
                Don't have an account?
              </span>
              <a
                className="text-xs text-blue-"
                href="/register"
                onClick={(event) => handleTabChange(event, 1)}
              >
                Register
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
    data: auth.login.data,
    loading: auth.login.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login: authActions.login,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
