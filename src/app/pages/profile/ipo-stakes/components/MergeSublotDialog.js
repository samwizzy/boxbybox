import React from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../../common/components";
import {
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

function MergeSublotDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ profileListing }) => profileListing.listing.mergeSublotDialog
  );

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeMergeSublotDialog())}
      aria-labelledby="merge-subslots"
      fullWidth
      maxWidth="sm"
    >
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
                    <strong>BBB Hierachy:</strong>
                  </TableCell>
                  <TableCell>21th</TableCell>
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
            id="bbb-sublots"
            select
            label="Sublots"
            name="sublots"
            value=""
            variant="outlined"
            margin="dense"
            classes={{ root: "w-40" }}
          >
            <MenuItem value="">Sublots</MenuItem>
          </TextField>
          <AppButton size="small" color="secondary" startIcon={<AddIcon />}>
            Add BBB Sublot
          </AppButton>
        </div>
      </DialogContent>

      <DialogActions>
        <AppButton
          size="small"
          variant="outlined"
          onClick={() => dispatch(Actions.closeMergeSublotDialog())}
        >
          Close
        </AppButton>
        <AppButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openConfirmMergeDialog())}
        >
          Merge sublot
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default MergeSublotDialog;
