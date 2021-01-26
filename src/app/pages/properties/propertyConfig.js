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
      path: "/property/:id/boxlots",
      component: loadable(() => import("./boxlots")),
    },
    {
      path: "/property",
      component: () => <Redirect to="/property/listing" />,
    },
  ],
};
