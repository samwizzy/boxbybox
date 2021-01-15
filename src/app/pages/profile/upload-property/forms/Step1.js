import React, { useEffect } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  FormLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 6),
  },
}));

const types = ["LUXURY_APARTMENT", "FLAT", "BUNGALOWS", "LAND", "OFFICE_BLOCK"];

function Step1(props) {
  const classes = useStyles(props);
  const {
    countries,
    states,
    lgas,
    form,
    handleChange,
    getStateByCountry,
    getLgaByState,
  } = props;

  useEffect(() => {
    if (form.address.country) {
      getStateByCountry(form.address.country);
    }
  }, [form.address.country, getStateByCountry]);

  useEffect(() => {
    if (form.address.state) {
      getLgaByState(form.address.state);
    }
  }, [form.address.state, getLgaByState]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="">
          <div>
            <FormControl component="fieldset" fullWidth>
              <FormLabel>Property type</FormLabel>
              <RadioGroup
                aria-label="feature"
                name="feature"
                value={form.feature}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="SALE"
                  control={<Radio />}
                  label="Sale"
                />
                <FormControlLabel
                  value="RENT"
                  control={<Radio />}
                  label="Rent"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="space-y-4 border-0 border-b border-solid border-gray-200 py-4">
            <TextField
              id="title"
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <div className="grid grid-cols-4 gap-x-8 gap-y-2">
              <TextField
                id="type"
                select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="units"
                label="Units"
                name="units"
                value={form.units}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="price"
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="documentsAvailable"
                select
                label="Available documents"
                name="documentsAvailable"
                value={form.documentsAvailable}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              >
                <MenuItem value="">Select document</MenuItem>
                {["CFO"].map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="space-y-4 border-0 border-b border-solid border-gray-200 py-4">
            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
              <TextField
                id="bedrooms"
                select
                label="Bedrooms"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              >
                <MenuItem value="0">No. of bedrooms</MenuItem>
                {_.range(1, 5).map((bed) => (
                  <MenuItem key={bed} value={bed}>
                    {bed}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="bathrooms"
                select
                label="Bathrooms"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              >
                <MenuItem value="0">No. of bathrooms</MenuItem>
                {_.range(1, 5).map((bath) => (
                  <MenuItem key={bath} value={bath}>
                    {bath}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="toilet"
                select
                label="Toilets"
                name="toilet"
                value={form.toilet}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              >
                <MenuItem value="0">No. of toilets</MenuItem>
                {_.range(1, 5).map((toilet) => (
                  <MenuItem key={toilet} value={toilet}>
                    {toilet}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="size"
                label="Size"
                name="size"
                value={form.size}
                onChange={handleChange}
                InputProps={{ endAdornment: <span>sq&nbsp;ft</span> }}
                variant="outlined"
                margin="dense"
                fullWidth
              />
            </div>

            <FormControl component="fieldset" fullWidth>
              <FormLabel>Property condition</FormLabel>
              <RadioGroup
                aria-label="condition"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="FURNISHED"
                  control={<Radio />}
                  label="Furnished"
                />
                <FormControlLabel
                  value="SERVICED"
                  control={<Radio />}
                  label="Serviced"
                />
                <FormControlLabel
                  value="NEWLY_BUILT"
                  control={<Radio />}
                  label="Newly Built"
                />
              </RadioGroup>
            </FormControl>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.parkingLot}
                    onChange={handleChange}
                    name="parkingLot"
                  />
                }
                label="Parking Lot"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.canBidFor}
                    onChange={handleChange}
                    name="canBidFor"
                  />
                }
                label="Open to bid"
              />
            </FormGroup>
          </div>
          <div className="space-y-4 border-0 border-b border-solid border-gray-200 py-4">
            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
              <TextField
                id="country"
                select
                label="Country"
                name="address.country"
                value={form.address.country}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              >
                <MenuItem value="">Select country</MenuItem>
                {countries.map((country, i) => (
                  <MenuItem key={i} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                id="select-state"
                name="address.state"
                select
                label="State"
                value={form.address.state}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Select state</MenuItem>
                {states.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="locality-city"
                label="City"
                name="address.city"
                value={form.address.city}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                margin="dense"
                id="select-lga-area"
                name="address.lga"
                select
                label="LGA Area"
                value={form.address.lga}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Select lga</MenuItem>
                {lgas.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="zip-code"
                label="Zip code"
                name="address.postCode"
                value={form.address.postCode}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="address"
                label="House No."
                name="address.houseNoAddress"
                value={form.address.houseNoAddress}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="latitude"
                label="Latitude"
                name="address.latitude"
                value={form.address.latitude}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="longitude"
                label="Longitude"
                name="address.longitude"
                value={form.address.longitude}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
              />
            </div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 py-4">
            <TextField
              id="description"
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              multiline
              rows={4}
              rowsMax={4}
              fullWidth
            />
          </div>
          <div className="space-y-4 py-4">
            <h3 className="text-gray-800">Rank package</h3>
            <span className="text-sm text-gray-600">
              Purchase higher listing rank and sell faster
            </span>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Package name</TableCell>
                  <TableCell>Days expire</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                    <Radio />
                  </TableCell>
                  <TableCell>Regular</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>{BoxUtils.formatCurrency(0)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Step1;
