import { Redirect } from "react-router-dom";
import Properties from "./listing";
import PropertyDetails from "./property-details";

export const PropertyConfig = {
  routes: [
    {
      path: "/property/listing",
      component: Properties,
    },
    {
      path: "/property/offers",
      component: Properties,
    },
    {
      path: "/property/bids",
      component: Properties,
    },
    {
      path: "/property/detail",
      component: PropertyDetails,
    },
    {
      path: "/property",
      component: () => <Redirect to="/property/listing" />,
    },
  ],
};
