import { Redirect } from "react-router-dom";
import loadable from "@loadable/component";

export const BidsConfig = {
  routes: [
    {
      path: "/live-bids",
      exact: true,
      component: loadable(() => import("./")),
    },
    {
      path: "/live-bid/:id",
      component: loadable(() => import("./livebid/index")),
    },
    {
      path: "/live-bid",
      component: () => <Redirect to="/live-bids" />,
    },
  ],
};
