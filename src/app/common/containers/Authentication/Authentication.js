import React, { Component } from "react";
import BoxUtils from "../../../utils/BoxUtils";
import { matchRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "../../../utils/AppContext";

class Authorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes: routes[0].routes,
    };
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }

    if (this.props.userRole !== prevProps.userRole) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matched = matchRoutes(state.routes, pathname)[0];

    return {
      accessGranted: matched
        ? BoxUtils.hasPermission(matched.route.auth, userRole)
        : true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  redirectRoute() {
    const { location, userRole, history } = this.props;
    const { pathname, state } = location;
    const redirectUrl = state && state.redirectUrl ? state.redirectUrl : "/";

    /*
        User is guest
        Redirect to Login Page
        */
    if (!userRole || userRole.length === 0) {
      history.push({
        pathname: "/",
        state: { redirectUrl: pathname },
      });
    } else {
      /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
      history.push({
        pathname: redirectUrl,
      });
    }
  }

  render() {
    // console.info('Ezone Authorization rendered', accessGranted);
    return this.state.accessGranted ? (
      <React.Fragment>{this.props.children}</React.Fragment>
    ) : null;
  }
}

function mapStateToProps({ auth }) {
  const { data } = auth.user;
  return {
    userRole: data.role,
  };
}

Authorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(Authorization));
