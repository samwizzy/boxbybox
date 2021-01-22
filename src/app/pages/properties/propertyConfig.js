import { Redirect } from "react-router-dom";
import loadable from "@loadable/component";
import Properties from "./";
import PropertyDetails from "./property-details";

export const PropertyConfig = {
  routes: [
    {
      path: "/properties",
      component: Properties,
    },
    {
      path: "/property/:id",
      exact: true,
      component: PropertyDetails,
    },
    {
      path: "/property/:id/offers",
      component: loadable(() => import("./offers")),
    },
    // {
    //   path: "/live-bids",
    //   exact: true,
    //   component: loadable(() => import("./bids")),
    // },
    // {
    //   path: "/live-bid/:id",
    //   component: loadable(() => import("./bids/livebid/index")),
    // },
    {
      path: "/property",
      component: () => <Redirect to="/property/listing" />,
    },
  ],
};
