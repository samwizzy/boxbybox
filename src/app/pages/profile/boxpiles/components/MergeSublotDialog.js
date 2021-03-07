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
    ({ boxpilesReducer }) => boxpilesReducer.ipostakes.mergeSublotDialog
  );
  const { data } = dialog;

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
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Property ID</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {data?.property.propertyRef}
          </dd>
          <dt className="text-sm font-medium text-gray-500">Market Price</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {BoxUtils.formatCurrency(data?.property?.price)}
          </dd>
          <dt className="text-sm font-medium text-gray-500">
            Purchased Amount
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {BoxUtils.formatCurrency(data?.purchaseAmount)}
          </dd>
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
