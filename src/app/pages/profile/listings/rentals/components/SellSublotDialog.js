import React from "react";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileListing }) => profileListing.listing.sellSublotDialog
  );

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
                  <TableCell>S001XXXEN/1/40/5/JD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Market Price:</strong>
                  </TableCell>
                  <TableCell>{BoxUtils.formatCurrency(105)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <TextField
            label="Selling Price"
            name="price"
            variant="outlined"
            margin="dense"
            classes={{ root: "w-56" }}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.closeSellSublotDialog())}
        >
          Sell Sublot
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default SellSublotDialog;
