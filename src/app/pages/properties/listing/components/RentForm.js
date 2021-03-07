import React from "react";
import _ from "lodash";
import { types } from "./../../../../utils/mock";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { AppButton } from "../../../../common/components";

export default function RentForm(props) {
  const { form, handleChange, handleFilter } = props;

  return (
    <div>
      <form className="grid grid-cols-3 gap-3">
        <div className="col-span-3 sm:col-span-3">
          <FormControl component="fieldset">
            <FormLabel component="legend">Condition</FormLabel>
            <RadioGroup
              aria-label="condition"
              name="condition"
              value={form.condition}
              onChange={handleChange}
            >
              <FormControlLabel
                value="SERVICED"
                control={<Radio />}
                label="Serviced"
              />
              <FormControlLabel
                value="FURNISHED"
                control={<Radio />}
                label="Furnished"
              />
              <FormControlLabel
                value="NEWLY_BUILT"
                control={<Radio />}
                label="Newly built"
              />
            </RadioGroup>
          </FormControl>

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
            {_.range(200000, 9000000000, 100000).map((price) => (
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
            {_.range(200000, 9000000000, 100000).map((price) => (
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
              onClick={handleFilter}
            >
              Search
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
