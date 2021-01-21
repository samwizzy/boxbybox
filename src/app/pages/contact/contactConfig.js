import loadable from "@loadable/component";

export const ContactConfig = {
  // auth: ["COMPANY"],
  routes: [
    {
      path: "/contacts",
      component: loadable(() => import(".")),
    },
  ],
};
