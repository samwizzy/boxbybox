import { Redirect } from "react-router-dom";
import Layout from "../common/containers/Layout";
import { pagesConfig } from "../pages/index";
import BoxUtils from "./../utils/BoxUtils";

const routesConfig = [...pagesConfig];

export const routes = [
  {
    component: Layout,
    routes: [
      ...BoxUtils.generateRoutesFromConfigs(routesConfig),
      {
        path: "/home",
        exact: true,
        component: () => <Redirect to="/" />,
      },
    ],
  },
];
