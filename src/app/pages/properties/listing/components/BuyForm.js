import React, { useState } from "react";
import clsx from "clsx";
import _ from "lodash";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { AppButton } from "../../../../common/components";

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

const initialState = {
  location: "",
  country: "",
  bedrooms: "",
  bathrooms: "",
  minPrice: "",
  maxPrice: "",
  furnished: false,
  serviced: false,
};

export default function SearchForm(props) {
  const classes = useStyles(props);
  const [form, setForm] = useState({ ...initialState });
  const countries = useSelector(({ auth }) => auth.location.countries);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  console.log(form, "form property");

  return (
    <div>
      <form className="grid grid-cols-3 gap-0 md:gap-3">
        <div className="col-span-3">
          <TextField
            margin="dense"
            id="location"
            name="location"
            label="Location"
            value={form.location}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            margin="dense"
            id="country"
            name="country"
            select
            label="Country"
            value={form.country}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select country</MenuItem>
            {countries.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="bedrooms"
            name="bedrooms"
            select
            label="Bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select country</MenuItem>
            {_.range(1, 5).map((bed) => (
              <MenuItem key={bed} value={bed}>
                {bed} {bed > 1 ? "bedrooms" : "bedroom"}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="min-price"
            name="minPrice"
            select
            label="Min Price"
            value={form.minPrice}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select Minimum Price</MenuItem>
            {_.range(200000, 1000000, 100000).map((price) => (
              <MenuItem key={price} value={price}>
                {price}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="max-price"
            name="maxPrice"
            select
            label="Max Price"
            value={form.maxPrice}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select Max Price</MenuItem>
            {_.range(200000, 1000000, 100000).map((price) => (
              <MenuItem key={price} value={price}>
                {price}
              </MenuItem>
            ))}
          </TextField>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.furnished}
                    onChange={handleChange}
                    name="furnished"
                  />
                }
                label="Furnished"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.serviced}
                    onChange={handleChange}
                    name="serviced"
                  />
                }
                label="Serviced"
              />
            </div>
          </div>

          <button
            type="button"
            className={clsx(classes.search, "flex items-center space-x-1 mt-4")}
          >
            <SearchIcon fontSize="small" />
            <Typography color="secondary" className="ml-2 text-sm">
              Advanced Search
            </Typography>
          </button>

          <div className="mt-4">
            <AppButton fullWidth variant="contained" color="secondary">
              Search
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
