import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "./store/actions";
import * as Actions from "../store/actions";
import authService from "./../services/authService";
import history from "./../history";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.authCheck();
  }

  componentDidUpdate() {
    history.listen((location, action) => {
      //Do your logic here and dispatch if needed
      if (location.pathname === "/logout") {
        // Do something here
        console.log("you can now call your logout action");
        this.props.logout();
      }
    });
  }

  authCheck = () => {
    authService.on("onAutoLogin", () => {
      this.props.showMessage({ message: "Logging in with Auth" });

      /**
       * Sign in and retrieve user data from Api
       */
      authService
        .signInWithToken()
        .then((user) => {
          this.props.setUserData(user);

          this.props.showMessage({ message: "Logged in with Auth" });
        })
        .catch((error) => {
          this.props.showMessage({ message: error });
        });
    });

    authService.on("onAutoLogout", (message) => {
      if (message) {
        this.props.showMessage({ message });
      }
      this.props.logout();
    });

    authService.init();
  };

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const mapStateToProps = ({ auth }) => {
  console.log(auth, "Auth wrapper");
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: authActions.logout,
      setUserData: authActions.setUserData,
      showMessage: Actions.showSnackbar,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
