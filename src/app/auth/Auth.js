import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "./store/actions";
import * as Actions from "../store/actions";
import authService from "./../services/authService";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.authCheck();
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
      // this.props.logout();
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
      setUserData: authActions.setUserData,
      showMessage: Actions.showSnackbar,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
