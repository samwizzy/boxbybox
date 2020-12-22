import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";

export const NewsConfig = {
  routes: [
    {
      path: "/news",
      component: loadable(() => import("./")),
    },
    {
      path: "/new",
      component: () => <Redirect to="/news" />,
    },
  ],
};
