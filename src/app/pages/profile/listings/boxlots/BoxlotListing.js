import React, { useState } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../../common/components";
import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    "& td": { border: 0 },
  },
}));

function BoxlotListing(props) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSublot, setSelectedSublot] = useState(null);
  const { properties, openSellSublotDialog, openMergeSublotDialog } = props;

  console.log(selectedSublot, "selectedSublot");

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

  const openMergeSublot = () => {
    openMergeSublotDialog(selectedSublot);
    handleClose();
  };

  return (
    <div className="container">
      <div className="bg-white pb-8">
        <div className="py-4 px-8">
          <h3 className="text-lg font-normal text-gray-600">BBB Sublots</h3>
        </div>

        <div className="flex flex-col md:flex-row md:justify-end md:items-center md:space-x-2 px-8 py-4">
          <TextField
            id="search-by-id"
            label="Search by ID"
            name="search"
            value=""
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
            id="category"
            select
            label="Category"
            name="category"
            value=""
            variant="outlined"
            margin="dense"
            classes={{ root: "w-40" }}
          >
            <MenuItem value="">Category</MenuItem>
          </TextField>
          <TextField
            id="bbb-hierachy"
            select
            label="Hierachy"
            name="hierachy"
            value=""
            variant="outlined"
            margin="dense"
            classes={{ root: "w-40" }}
          >
            <MenuItem value="">BBB Hierachy</MenuItem>
          </TextField>
          <AppButton variant="contained" color="secondary">
            Filter
          </AppButton>
        </div>

        <div className="space-y-4">
          {properties.entities.map((property, i) => (
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
                          <strong>Property ID:</strong>
                        </TableCell>
                        <TableCell>{property.propertyRef}</TableCell>
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
                          <strong>BBB Hierachy:</strong>
                        </TableCell>
                        <TableCell>{moment().format("DD")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Category:</strong>
                        </TableCell>
                        <TableCell>1</TableCell>
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
                    onClick={handleClick(property)}
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
          <MenuItem onClick={openSellSublot}>Sell BBB Sublots</MenuItem>
          <MenuItem onClick={openMergeSublot}>Merge Sublots</MenuItem>
          <MenuItem onClick={handleClose}>Split Sublots</MenuItem>
        </Menu>

        <div className="flex items-center justify-center mt-16">
          <Pagination count={10} variant="outlined" color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default BoxlotListing;
