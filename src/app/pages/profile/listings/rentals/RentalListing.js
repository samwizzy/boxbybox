import React, { useState, useEffect } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./../../store/actions";
import moment from "moment";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { types } from "app/utils/mock";
import { AppButton } from "./../../../../common/components";
import {
  Icon,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Pagination from "@material-ui/lab/Pagination";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    "& td": { border: 0, verticalAlign: "top" },
  },
}));

function RentalListing(props) {
  const classes = useStyles(props);
  const { properties } = props;
  const dispatch = useDispatch();
  const [filteredProperties, setFilteredProperties] = useState({
    ...properties,
    entities: _.sortBy(properties.entities, "createdAt", "desc"),
  });
  const countries = useSelector(({ auth }) => auth.location.countries);
  const [form, setForm] = useState({
    searchText: "",
    status: "",
    type: "",
    dateAdded: null,
  });

  useEffect(() => {
    const { searchText } = form;
    if (searchText.length > 0) {
      let searchedEntities = properties.entities.filter((prop) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return prop.title.match(regex);
      });

      setFilteredProperties({ ...properties, entities: _.sortBy(searchedEntities, "createdAt", "desc")  });
    }
  }, [form, properties]);

  const handleFilter = () => {
    const { searchText, type, status, dateAdded } = form;
    if (searchText.length > 0 && type.length && dateAdded) {
      let searchedEntities = properties.entities.filter((prop) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        const createdAt = moment(prop.createdAt, ["DD-MM-YYYY"]).format(
          "YYYY-MM-DD"
        );
        return (
          (prop.title.match(regex) &&
            prop.type === type &&
            prop.status === status) ||
          moment(createdAt).isSame(dateAdded)
        );
      });

      setFilteredProperties({ ...properties, entities: _.sortBy(searchedEntities, "createdAt", "desc")  });
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleDateChange = (name) => (date) => {
    setForm({
      ..._.set(form, name, moment(date).format("YYYY-MM-DD")),
    });
  };

  const handlePaginate = (event, page) => {
    dispatch(Actions.getProperties({ page: page - 1 }));
  };

  const canSubmit = () => {
    return _.some(form, _.isEmpty);
  };

  console.log(filteredProperties, "filteredProperties for rentals");

  return (
    <div className="container">
      <div className="bg-white pb-8 px-8">
        <div className="py-4">
          <h3 className="text-lg font-normal text-gray-600">
            My Rental Listing
          </h3>
        </div>

        <div className="flex flex-col md:flex-row md:justify-end md:items-center md:space-x-2 py-4">
          <TextField
            id="search-by-title-id"
            label="Search by title or ID"
            name="searchText"
            value={form.searchText}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="type"
            select
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-full md:w-40" }}
          >
            <MenuItem value="">Type</MenuItem>
            {types.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="status"
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-full md:w-40" }}
          >
            <MenuItem value="">Status</MenuItem>
            {["ACTIVE", "INACTIVE"].map((status, i) => (
              <MenuItem key={i} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              format="dd MMMM yyyy"
              minDate="1980-01-01"
              id="date-added"
              label="Date Added"
              onChange={handleDateChange("dateAdded")}
              value={form.dateAdded}
              variant="inline"
              inputVariant="outlined"
              margin="dense"
            />
          </MuiPickersUtilsProvider>
          <div className="mt-2 md:mt-0" />
          <AppButton
            variant="contained"
            color="secondary"
            disabled={canSubmit()}
            onClick={handleFilter}
          >
            Filter
          </AppButton>
        </div>

        <div className="space-y-4">
          {filteredProperties.entities.map((property, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row space-x-2 border-0 border-t border-solid border-gray-200"
            >
              <div>
                <img
                  src="https://image.freepik.com/free-vector/logo-template-design_1289-160.jpg"
                  alt=""
                  className="w-60"
                />
              </div>
              <div className="flex flex-col space-y-6 p-4 w-full">
                <div className="flex flex-col md:flex-row justify-between md:space-x-2">
                  <Table size="small" className={classes.table}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Property Name:</strong>
                        </TableCell>
                        <TableCell>{property.title}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>PMP Per Units:</strong>
                        </TableCell>
                        <TableCell>
                          {BoxUtils.formatCurrency(
                            Number(property.price) / Number(property.units)
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Market Price:</strong>
                        </TableCell>
                        <TableCell>
                          {BoxUtils.formatCurrency(property.price)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table size="small" className={classes.table}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Location:</strong>
                        </TableCell>
                        <TableCell>
                          {`${property.address.houseNoAddress} ${
                            property.address.city
                          } ${
                            countries &&
                            _.find(countries, {
                              id: Number(property.address.country),
                            }).name
                          }`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Property Ref:</strong>
                        </TableCell>
                        <TableCell>{property.propertyRef}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Date Acquired:</strong>
                        </TableCell>
                        <TableCell>
                          {moment(property.createdAt, ["DD-MM-YYYY"]).format(
                            "ll"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 sm:space-y-0 px-4">
                  <div className="flex items-center space-x-1 flex-wrap mt-5">
                    <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-4">
                      {170} sqft
                    </div>
                    <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-4">
                      <Icon fontSize="small">hotel</Icon>&nbsp;{4}
                    </div>
                    <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-4">
                      <Icon fontSize="small">bathtub</Icon>&nbsp;{6}
                    </div>
                    <div className="flex items-center text-sm border-0 px-4">
                      <Icon fontSize="small">drive_eta</Icon>&nbsp;
                      {1 ? "Yes" : "No"}
                    </div>
                  </div>
                  <AppButton
                    variant="contained"
                    color="secondary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    component={Link}
                    to={`/property/${property.id}`}
                  >
                    View Property
                  </AppButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={Link} to={`/property/${property.id}`}>View Property</MenuItem>
          <MenuItem onClick={openSellSublot}>Edit Details</MenuItem>
          <MenuItem onClick={openMergeSublot}>Feature Property</MenuItem>
          <MenuItem onClick={handleClose}>Mark as Rented</MenuItem>
          <MenuItem onClick={handleClose}>Renew</MenuItem>
          <MenuItem onClick={handleClose}>View rent schedule</MenuItem>
          <MenuItem onClick={handleClose}>Maintenance Schedule</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu> */}

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
  );
}

export default RentalListing;
