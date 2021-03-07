import loadable from "@loadable/component";

export const AboutConfig = {
  routes: [
    {
      path: "/about",
      component: loadable(() => import(".")),
    },
  ],
};
