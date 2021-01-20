import { Redirect } from "react-router-dom";
import loadable from "@loadable/component";

export const BidsConfig = {
  routes: [
    {
      path: "/live-bids",
      exact: true,
      component: loadable(() => import("./bids")),
    },
    {
      path: "/live-bid/:id",
      component: loadable(() => import("./bids/livebid/index")),
    },
    {
      path: "/live-bid",
      component: () => <Redirect to="/live-bids" />,
    },
  ],
};
