import { Redirect } from "react-router-dom";
import loadable from "@loadable/component";
import ProfileDetails from "./";

export const ProfileConfig = {
  routes: [
    {
      path: "/profile",
      exact: true,
      component: ProfileDetails,
    },
    {
      path: "/profile/properties",
      exact: true,
      component: loadable(() => import("./listings")),
    },
    {
      path: "/profile/properties/:propertyId/boxpiles",
      component: loadable(() => import("./boxpiles")),
    },
    {
      path: "/profile/wallet",
      component: loadable(() => import("./wallet")),
    },
    {
      path: "/profile/upload-property",
      component: loadable(() => import("./upload-property")),
    },
    {
      path: "/profile/bids",
      component: loadable(() => import("./bids")),
    },
    {
      path: "/profile",
      component: () => <Redirect to="/" />,
    },
  ],
};
