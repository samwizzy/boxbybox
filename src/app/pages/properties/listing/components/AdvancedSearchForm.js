import React from "react";
import clsx from "clsx";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { AppButton } from "./../../../../common/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  search: {
    border: "none",
    "& svg": {
      fill: theme.palette.secondary.main,
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function AdvancedSearchForm(props) {
  const classes = useStyles(props);

  const handleChange = (event) => {};

  const handleSubmit = () => {};

  return (
    <div>
      <form className="grid grid-cols-3 gap-3">
        <div className="col-span-3 sm:col-span-3">
          <input
            type="text"
            name="location"
            placeholder="Location"
            id="location"
            autoComplete="location"
            onChange={handleChange}
            className="mt-2 py-2 px-3 block w-full border border-solid border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-500 sm:text-sm"
          />

          <select
            id="country"
            name="country"
            autoComplete="country"
            onChange={handleChange}
            className="mt-2 py-2 px-2 block w-full border border-solid border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>

          <select
            id="bedroom"
            name="bedroom"
            autoComplete="bedroom"
            onChange={handleChange}
            className="mt-2 py-2 px-2 block w-full border border-solid border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {_.range(1, 5).map((bed) => (
              <option key={bed}>
                {bed} {bed > 1 ? "bedrooms" : "bedroom"}
              </option>
            ))}
          </select>

          <select
            id="min-price"
            name="min-price"
            autoComplete="min-price"
            onChange={handleChange}
            className="mt-2 py-2 px-2 block w-full border border-solid border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {_.range(200000, 1000000, 100000).map((price) => (
              <option key={price}>{price}</option>
            ))}
          </select>

          <select
            id="max-price"
            name="max-price"
            autoComplete="max-price"
            onChange={handleChange}
            className="mt-2 py-2 px-2 block w-full border border-solid border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {_.range(200000, 1000000, 100000).map((price) => (
              <option key={price}>{price}</option>
            ))}
          </select>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="furnished"
                    name="furnished"
                    type="checkbox"
                    onChange={handleChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="furnished"
                    className="font-medium text-gray-700"
                  >
                    Furnished
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="serviced"
                    name="serviced"
                    type="checkbox"
                    onChange={handleChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="serviced"
                    className="font-medium text-gray-700"
                  >
                    Serviced
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onChange={handleSubmit}
            className={clsx(classes.search, "flex items-center space-x-1 mt-4")}
          >
            <SearchIcon fontSize="small" />
            <Typography color="secondary" className="ml-2 text-sm">
              Advanced Search
            </Typography>
          </button>

          <div className="mt-4">
            <AppButton className="w-full" variant="contained" color="secondary">
              Search
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
