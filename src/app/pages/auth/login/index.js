import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { AppButton } from "./../../../common/components";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundImage: "url(assets/images/auth/screen.svg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

export default function Login(props) {
  const classes = useStyles(props);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className={clsx(classes.screen, "flex screen")}></div>
        <div className="">
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
              id="name"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <AppButton fullWidth variant="contained" color="secondary">
              Login
            </AppButton>

            <div className="lg:text-center space-x-1">
              <span className="text-xs text-gray-600">
                Don't have an account?
              </span>
              <a className="text-xs text-blue-" href="/register">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
