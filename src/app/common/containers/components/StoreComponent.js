import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  smart: {
    "& > img:first-child": {
      position: "absolute",
      top: "-120px",
      bottom: 0,
      right: 180,
      zIndex: theme.zIndex.drawer,
    },
    "& > img:last-child": {
      position: "absolute",
      top: "-80px",
      bottom: 0,
      right: 0,
      zIndex: theme.zIndex.drawer,
    },
  },
}));

export default function StoreComponent(props) {
  const classes = useStyles(props);

  return (
    <div>
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24">
          <div className="md:grid md:grid-cols-2 md:grid-rows-1 md:space-x-2">
            <div className="flex-1">
              <h2 className="text-3xl font-bold">
                Get the BoxbyBox App Today!
              </h2>
              <p className="text-sm font-light my-4 capitalize">
                Download the BoxbyBox APP (Find our APP in the App store or
                Googleplay)
              </p>

              <div className="max-w-md space-x-2 mt-8 md:space-x-8">
                <img
                  className="h-10"
                  src="assets/images/store/appstore.svg"
                  alt="app-store"
                />
                <img
                  className="h-10"
                  src="assets/images/store/play-store.svg"
                  alt="app-store"
                />
              </div>
            </div>
            <div
              className={clsx(classes.smart, "relative flex-1 hidden md:block")}
            >
              <img src="assets/images/bg/smartmockups.svg" alt="" />
              <img src="assets/images/bg/smartmockups.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
