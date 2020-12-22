import loadable from "@loadable/component";

export const ContactConfig = {
  routes: [
    {
      path: "/contacts",
      component: loadable(() => import("./")),
    },
  ],
};
