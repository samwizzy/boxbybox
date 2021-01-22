import React, { useState } from "react";
import _ from "lodash";
import { MenuItem, TextField } from "@material-ui/core";
import { AppButton } from "../../../common/components";

const initialState = {
  location: "",
  type: "",
  minPrice: "",
  maxPrice: "",
};

const types = ["LAND", "BUNGALOWS", "FLAT", "LUXURY_APARTMENT"];

export default function RentForm(props) {
  const [form, setForm] = useState({ ...initialState });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {};

  return (
    <div>
      <form className="grid grid-cols-3 gap-3">
        <div className="col-span-3 sm:col-span-3">
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
            id="type"
            name="type"
            select
            label="Type"
            value={form.type}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select type</MenuItem>
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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

          <div className="mt-4">
            <AppButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Search
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
