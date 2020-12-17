import { Route, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { renderRoutes } from "react-router-config";
import history from "./history";
import store from "./store";
import { Layout, Theme } from "./common/containers";
import Home from "./pages/Home";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import NotFound from "./pages/404";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Theme>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/news" component={News} />
                <Route path="/about" component={About} />
                <Route path="/contacts" component={Contact} />
                <Route path="/listing" component={Properties} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Layout>
          </Theme>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
