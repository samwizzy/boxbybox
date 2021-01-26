import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "./../store/actions";
import clsx from "clsx";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Divider, Tabs, Tab } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { AppBreadcrumbs, TabPanel } from "../../../common/components";
import BuyForm from "./components/BuyForm";
import RentForm from "./components/RentForm";
import PropertyCard from "./../components/PropertyCard";

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
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Listing(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { properties } = props;
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePaginate = (event, page) => {
    dispatch(Actions.getProperties({ page: page - 1 }));
  };

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 mt-16 md:col-span-2">
              <AppBar position="static" color="inherit" elevation={0}>
                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleTabChange}
                  centered
                  aria-label="simple tabs example"
                >
                  <Tab label="Buy" {...a11yProps(0)} />
                  <Tab label="Rent" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0}>
                  <BuyForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <RentForm />
                </TabPanel>
              </div>
            </div>
            <div className="col-span-6 md:col-span-4">
              <AppBreadcrumbs current="Properties" />

              <h3 className="text-gray-800 font-medium text-lg mb-4 mt-1">
                Property Listing ({properties.total})
              </h3>

              {properties.entities.map((property, i) => (
                <Fragment key={i}>
                  <PropertyCard property={property} />

                  {_.range(0, 1).length !== i && (
                    <Divider className={classes.divider} />
                  )}
                </Fragment>
              ))}

              {properties.total ? (
                <div className="flex items-center justify-center mt-16">
                  <Pagination
                    count={_.ceil(properties.total / properties.limit)}
                    variant="outlined"
                    color="secondary"
                    onChange={handlePaginate}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
