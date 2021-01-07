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
    {
      path: "/property/:id/bids",
      component: Properties,
    },
    {
      path: "/property",
      component: () => <Redirect to="/property/listing" />,
    },
  ],
};
