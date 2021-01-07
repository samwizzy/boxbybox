import loadable from "@loadable/component";

export const HomeConfig = {
  // auth: ["COMPANY"],
  routes: [
    {
      path: "/",
      component: loadable(() => import(".")),
    },
  ],
};
