import "./config/axiosConfig";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./auth/Auth";
import history from "./history";
import store from "./store";
import { Theme, Authentication } from "./common/containers";
import { routes } from "./config/routeConfig";
import { renderRoutes } from "react-router-config";
import AppContext from "./utils/AppContext";

function App() {
  return (
    <div className="App" title="app">
      <AppContext.Provider value={{ routes }}>
        <Provider store={store}>
          <Router history={history}>
            <Auth>
              <Theme>
                <Authentication>
                  <Switch>{renderRoutes(routes)}</Switch>
                </Authentication>
              </Theme>
            </Auth>
          </Router>
        </Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
