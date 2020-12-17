import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Tabs, Tab, Typography } from "@material-ui/core";
import Banner from "./components/Banner";
import { AppButton } from "./../../common/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {
    "& button": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      "&:last-child": {
        marginLeft: theme.spacing(2),
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function About(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState("rent");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-2 mt-16">
              <AppBar position="static" color="inherit" elevation={0}>
                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleChange}
                  centered
                  aria-label="simple tabs example"
                >
                  <Tab label="Buy" {...a11yProps(0)} />
                  <Tab label="Rent" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0}>
                  <form className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 sm:col-span-3">
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        id="location"
                        autocomplete="location"
                        className="mt-2 py-2 px-3 border border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />

                      <select
                        id="country"
                        name="country"
                        autocomplete="country"
                        className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>

                      <div className="mt-1 relative">
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded="true"
                          aria-labelledby="listbox-label"
                          className="relative w-full bg-white border border-gray-300 rounded-md transition duration-150 ease-in-out shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <span className="block truncate">
                            Select an option
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>

                        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                          <ul
                            tabindex="-1"
                            role="listbox"
                            aria-labelledby="listbox-label"
                            aria-activedescendant="listbox-item-3"
                            className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                          >
                            <li
                              id="listbox-item-0"
                              aria-roledescription="option"
                              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                            >
                              <div className="flex items-center">
                                <img
                                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                  alt=""
                                  className="flex-shrink-0 h-6 w-6 rounded-full"
                                />
                                <span className="ml-3 block font-normal truncate">
                                  Wade Cooper
                                </span>
                              </div>

                              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <input
                        type="text"
                        name="email_address"
                        placeholder="Email Address"
                        id="email_address"
                        autocomplete="email"
                        className="mt-2 py-2 px-3 border border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />

                      <input
                        type="text"
                        name="website"
                        placeholder="Website"
                        id="website"
                        autocomplete="website"
                        className="mt-2 py-2 px-3 border border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />

                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        className="mt-2 py-2 px-3 shadow-sm border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                      ></textarea>

                      <div className="mt-2">
                        <AppButton>Send Message</AppButton>
                      </div>
                    </div>
                  </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Tab two
                </TabPanel>
              </div>
            </div>
            <div className="col-span-4">
              <Banner />
              <img
                src="https://image.freepik.com/free-vector/coronavirus-breaking-news-background_23-2148736973.jpg"
                alt="about bbb"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
