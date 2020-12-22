import loadable from "@loadable/component";

export const AuthConfig = {
  routes: [
    {
      path: "/",
      component: loadable(() => import("./")),
    },
  ],
};
