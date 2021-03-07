import React, { useState, useEffect } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import moment from "moment";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { conditions, types } from "./../../../../utils/mock";
import { AppButton } from "../../../../common/components";
import {
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    "& td": { border: 0, verticalAlign: "top" },
  },
}));

function BoxlotListing(props) {
  const classes = useStyles(props);
  const { properties } = props;
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [filteredProperties, setFilteredProperties] = useState(
    _.sortBy(properties, "createdAt", "desc")
  );

  const [form, setForm] = useState({
    searchText: "",
    condition: "",
    type: "",
  });

  useEffect(() => {
    setFilteredProperties(_.sortBy(properties, "createdAt", "desc"));

    return () => {};
  }, [properties]);

  useEffect(() => {
    const { searchText } = form;
    if (searchText.length > 0) {
      let searchedProperties = properties.filter((prop) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return prop.title.match(regex);
      });

      setFilteredProperties(_.sortBy(searchedProperties, "createdAt", "desc"));
    }
  }, [form, properties]);

  const handleFilter = () => {
    const { searchText, condition, type } = form;
    if (searchText.length > 0 && condition.length && type.length) {
      let searchedProperties = properties.filter((prop) => {
        const regex = new RegExp(`^${searchText}`, "gi");

        return (
          prop.title.match(regex) &&
          prop.condition === condition &&
          prop.type === type
        );
      });

      setFilteredProperties(_.sortBy(searchedProperties, "createdAt", "desc"));
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlePaginate = (event, page) => {
    dispatch(Actions.getProperties({ page: page - 1 }));
  };

  const canSubmit = () => {
    const { hierachy, ...rest } = form;
    return _.some(rest, _.isEmpty);
  };

  console.log(filteredProperties, "filteredProperties for boxlots");
  console.log(properties, "user properties sam checking");
  console.log(form, "form for boxlots");

  return (
    <div className="container">
      <div className="bg-white pb-8 px-8">
        <div className="py-4">
          <h3 className="text-lg font-normal text-gray-600">My Properties</h3>
        </div>

        <div className="flex flex-col md:flex-row md:justify-end md:items-center md:space-x-2 py-4">
          <TextField
            id="search-by-id"
            label="Search by ID"
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
            id="condition"
            select
            label="Condition"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-40" }}
          >
            <MenuItem value="">Condition</MenuItem>
            {conditions.map((condition, i) => (
              <MenuItem key={i} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="bbb-type"
            select
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-40" }}
          >
            <MenuItem value="">Types</MenuItem>
            {types.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
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

        {!properties.length && (
          <Alert severity="info">
            <AlertTitle>Hey there!</AlertTitle>
            <div className="flex flex-col md:flex-row items-center space-x-4 space-y-2">
              There are no properties to which you have obtained a boxlot
              —&nbsp;
              <strong>Obtain a property boxlot here!</strong>
              <AppButton variant="contained" color="secondary">
                Buy Property
              </AppButton>
            </div>
          </Alert>
        )}

        <div className="space-y-4">
          {filteredProperties.map((property, i) => (
            <div
              key={i}
              className="flex space-x-2 border-0 border-t border-b border-solid border-gray-200"
            >
              <div>
                <img
                  src="https://image.freepik.com/free-vector/logo-template-design_1289-160.jpg"
                  alt=""
                  height="180px"
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
                          {`${property.address.houseNoAddress} ${property.address.city} ${property.address.country}`}
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
                        <TableCell>{moment().format("ll")}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end px-4">
                  <AppButton
                    variant="contained"
                    color="secondary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    component={Link}
                    to={`${match.url}/${property.id}/boxpiles`}
                  >
                    View Boxpiles
                  </AppButton>
                </div>
              </div>
            </div>
          ))}
        </div>

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

export default BoxlotListing;
