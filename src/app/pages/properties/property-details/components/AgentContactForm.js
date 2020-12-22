import React from "react";
import { TextField } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AppButton } from "../../../../common/components";

export default function SearchForm(props) {
  return (
    <div>
      <h3 className="text-gray-600 my-4">Book Appointment</h3>
      <form className="grid grid-cols-3">
        <div className="col-span-3 space-y-4">
          <TextField
            id="full-name"
            fullWidth
            margin="dense"
            label="Full name"
            variant="outlined"
            className="mt-16"
          />
          <TextField
            id="email"
            fullWidth
            margin="dense"
            label="Email"
            variant="outlined"
            className="mt-16"
          />
          <TextField
            id="phone-number"
            fullWidth
            margin="dense"
            label="Phone number"
            variant="outlined"
            className="mt-16"
          />
          <TextField
            id="message"
            fullWidth
            margin="dense"
            label="Message"
            variant="outlined"
            className="mt-16"
            multiline
            rows={3}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="flex items-center justify-between space-x-1">
              <DatePicker
                autoOk
                id="date"
                label="Date"
                variant="inline"
                inputVariant="outlined"
                margin="dense"
              />
              <DatePicker
                autoOk
                id="time"
                label="Time"
                variant="inline"
                inputVariant="outlined"
                margin="dense"
              />
            </div>
          </MuiPickersUtilsProvider>

          <label className="flex items-center ml-2 text-sm space-x-4 my-6">
            <span>
              Agent Fee : <strong className="text-red-700">1500000</strong>{" "}
            </span>
            <AppButton color="secondary" variant="contained">
              Pay
            </AppButton>
          </label>

          <div className="mt-4">
            <AppButton fullWidth variant="contained" color="secondary">
              Book now
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
