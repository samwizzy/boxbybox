import React, { useState, useEffect } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import { useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import * as propActions from "./../../../properties/store/actions";
import moment from "moment";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { conditions } from "./../../../../utils/mock";
import { AppButton, AppBreadcrumbs } from "../../../../common/components";
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import BuyIpoStakeDialog from "./../../../properties/property-details/dialogs/BuyIpoStakeDialog";
import ConfirmIpoStakeDialog from "./../../../properties/property-details/dialogs/ConfirmIpoStakeDialog";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    "& td": { border: 0 },
  },
}));

function BoxlotListing(props) {
  const classes = useStyles(props);
  const {
    boxpiles,
    property,
    user,
    openSellSublotDialog,
    openConfirmMergeDialog,
    openConfirmSplitDialog,
  } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSublot, setSelectedSublot] = useState(null);
  const [filteredBoxpiles, setFilteredBoxpiles] = useState(boxpiles);
  const [selectedBoxpile, setSelectedBoxpile] = useState({
    ipos: [],
    propertyId: property?.id,
  });
  const [form, setForm] = useState({
    searchText: "",
    condition: "",
    hierachy: "",
  });

  useEffect(() => {
    setSelectedBoxpile((state) => ({ ...state, propertyId: property?.id }));
    return () => {};
  }, [property]);

  useEffect(() => {
    setFilteredBoxpiles(boxpiles);
    return () => {};
  }, [boxpiles]);

  useEffect(() => {
    const { searchText } = form;
    if (searchText.length > 0) {
      let searchedEntities = boxpiles.entities.filter((prop) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return prop.title.match(regex);
      });

      setFilteredBoxpiles({ ...boxpiles, entities: searchedEntities });
    }
  }, [form, boxpiles]);

  const handleFilter = () => {
    const { searchText, condition } = form;
    if (searchText.length > 0 && condition.length) {
      let searchedEntities = boxpiles.entities.filter((prop) => {
        const regex = new RegExp(`^${searchText}`, "gi");

        return prop.title.match(regex) && prop.condition === condition;
      });

      console.log(searchedEntities, "searchedEntities");

      setFilteredBoxpiles({ ...boxpiles, entities: searchedEntities });
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleBoxpileChange = (event) => {
    const { name, value, checked } = event.target;

    setSelectedBoxpile({
      ...selectedBoxpile,
      [name]: checked
        ? [...selectedBoxpile.ipos, Number(value)]
        : [...selectedBoxpile.ipos.filter((ipo) => ipo !== Number(value))],
    });

    setSelectedSublot(
      boxpiles.entities.find((boxpile) => boxpile.id === Number(value))
    );
  };

  const handlePaginate = (event, page) => {
    dispatch(Actions.getProperties({ page: page - 1 }));
  };

  const handleClick = (property) => (event) => {
    setSelectedSublot(property);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSellSublot = () => {
    openSellSublotDialog(selectedSublot);
    handleClose();
  };

  const confirmMergeBoxpile = () => {
    openConfirmMergeDialog(selectedBoxpile);
    handleClose();
  };

  const confirmSplitBoxpile = () => {
    openConfirmSplitDialog(selectedSublot);
    handleClose();
  };

  const canSubmit = () => {
    const { hierachy, ...rest } = form;
    return _.some(rest, _.isEmpty);
  };

  console.log(filteredBoxpiles, "filteredProperties for Boxpiles");
  console.log(form, "form for Boxpiles");
  console.log(boxpiles, "boxpiles for Boxpiles");
  console.log(selectedBoxpile, "boxpiles for selectedBoxpile");
  console.log(selectedSublot, "boxpiles for selectedSublot");

  return (
    <div className="container">
      <div className="bg-white pb-8 px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <AppBreadcrumbs
              prevLinks={{
                Properties: "/profile/properties",
                [property?.title || ""]: `/property/${property?.id}`,
              }}
              current="My Boxpiles"
            />

            {selectedBoxpile.ipos.length > 1 && (
              <AppButton
                variant="contained"
                color="secondary"
                onClick={confirmMergeBoxpile}
              >
                Merge
              </AppButton>
            )}
            {selectedBoxpile.ipos.length === 1 && (
              <AppButton
                variant="contained"
                color="secondary"
                onClick={confirmSplitBoxpile}
              >
                Split
              </AppButton>
            )}
          </div>
          <h3 className="text-lg font-normal text-gray-600">Boxpiles</h3>
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
            id="bbb-hierachy"
            select
            label="Hierachy"
            name="hierachy"
            value={form.hierachy}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-40" }}
          >
            <MenuItem value="">BBB Hierachy</MenuItem>
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

        {!boxpiles.total && (
          <Alert severity="info">
            <AlertTitle>Hey there!</AlertTitle>
            <div className="flex flex-col md:flex-row md:flex-wrap items-center space-y-2">
              There are no properties to which you have obtained a boxpiles
              —&nbsp;
              <strong className="mr-4">Obtain a property boxpile here!</strong>
              <div className="flex flex-col items-start space-y-2">
                <AppButton
                  variant="contained"
                  color="secondary"
                  disabled={
                    !property?.unitsAvailable ||
                    user.id === property?.createdBy?.id
                  }
                  onClick={() =>
                    dispatch(propActions.openIpoStakeDialog(property))
                  }
                >
                  Buy a new Boxpile
                </AppButton>
                {user.id === property?.createdBy?.id && (
                  <em className="text-xs text-gray-600">
                    You can not obtain boxpile on your own property
                  </em>
                )}
              </div>
            </div>
          </Alert>
        )}

        <div className="space-y-4">
          {filteredBoxpiles.entities.map((boxpile, i) => (
            <div
              key={i}
              className="flex items-start space-x-2 border-0 border-t border-b border-solid border-gray-200"
            >
              <Checkbox
                checked={Boolean(selectedBoxpile.ipos.includes(boxpile.id))}
                onChange={handleBoxpileChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                name="ipos"
                value={boxpile.id}
              />

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
                          <strong>Property ID:</strong>
                        </TableCell>
                        <TableCell>{boxpile.property.propertyRef}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>PMP Per Units:</strong>
                        </TableCell>
                        <TableCell>
                          {BoxUtils.formatCurrency(
                            Number(boxpile.property.price) /
                              Number(boxpile.property.units)
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Market Price:</strong>
                        </TableCell>
                        <TableCell>
                          {BoxUtils.formatCurrency(boxpile.property.price)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table size="small" className={classes.table}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Amount Purchased:</strong>
                        </TableCell>
                        <TableCell>
                          {BoxUtils.formatCurrency(boxpile.purchaseAmount)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Selling Price:</strong>
                        </TableCell>
                        <TableCell>
                          {BoxUtils.formatCurrency(boxpile.sellingAmount)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Unit Purchased:</strong>
                        </TableCell>
                        <TableCell>
                          {boxpile.noOfUnitsPurchased} units
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Status:</strong>
                        </TableCell>
                        <TableCell>{boxpile.status}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Date Acquired:</strong>
                        </TableCell>
                        <TableCell>
                          {moment(boxpile.createdAt, ["DD-MM-YYYY"]).format(
                            "ll"
                          )}
                        </TableCell>
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
                    onClick={handleClick(boxpile)}
                  >
                    Manage Property
                  </AppButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={openSellSublot}>Sell Boxpile</MenuItem>
          <MenuItem onClick={confirmSplitBoxpile}>Split Boxpile</MenuItem>
        </Menu>

        {boxpiles.total ? (
          <div className="flex items-center justify-center mt-16">
            <Pagination
              count={_.ceil(boxpiles.total / boxpiles.limit)}
              variant="outlined"
              color="secondary"
              onChange={handlePaginate}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <BuyIpoStakeDialog />
      <ConfirmIpoStakeDialog />
    </div>
  );
}

export default BoxlotListing;
