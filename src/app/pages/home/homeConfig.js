import loadable from "@loadable/component";

export const HomeConfig = {
  routes: [
    {
      path: "/",
      component: loadable(() => import("./")),
    },
  ],
};
