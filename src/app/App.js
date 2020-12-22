import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./history";
import store from "./store";
import { Theme } from "./common/containers";
import { routes } from "./config/routeConfig";
import { renderRoutes } from "react-router-config";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <Switch>{renderRoutes(routes)}</Switch>
          </Theme>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
