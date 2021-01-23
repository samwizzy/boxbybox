import React, { useState, useEffect } from "react";
import BoxUtils from "../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../../common/components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  },
  table: {
    "& td": { border: 0 },
  },
}));

function SellSublotDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ amount: 0, ipoId: 0 });
  const ipoStakes = useSelector(
    ({ profileListing }) => profileListing.ipostakes
  );
  const dialog = ipoStakes.sellSublotDialog;
  const { data } = dialog;
  const userBoxlots = ipoStakes.userBoxlots;

  useEffect(() => {
    if (dialog.data) {
      dispatch(Actions.getUserIpoStakes(dialog.data.id));
    }
    return () => {};
  }, [dialog.data, dispatch]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  console.log(form, "put ipo up for sale");

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeSellSublotDialog())}
      aria-labelledby="bid-offers-payment"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Sell BBB Sublots</DialogTitle>
      <DialogContent>
        <div className="flex items-center space-x-2">
          <div>
            <img
              src="https://image.freepik.com/free-vector/logo-template-design_1289-160.jpg"
              alt=""
              height="180px"
            />
          </div>
          <div>
            <Table size="small" className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Property ID:</strong>
                  </TableCell>
                  <TableCell>{data && data.propertyRef}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Market Price:</strong>
                  </TableCell>
                  <TableCell>
                    {data && BoxUtils.formatCurrency(data.price)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <TextField
            id="selling-price"
            label="Selling Price"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-56" }}
          />

          <TextField
            id="ipo-stake"
            select
            label="IPO stake"
            name="ipoId"
            value={form.ipoId}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            classes={{ root: "w-56" }}
          >
            <MenuItem value="0">Select IPO stake</MenuItem>
            {userBoxlots.entities.map((boxlot, i) => (
              <MenuItem key={i} value={boxlot.id}>
                {boxlot.purchaseAmount}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmSaleDialog(form))}
        >
          Sell Sublot
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default SellSublotDialog;
