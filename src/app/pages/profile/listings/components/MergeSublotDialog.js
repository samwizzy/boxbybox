import React, { useState, useEffect } from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../../common/components";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  ListItemText,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

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

function MergeBoxlotDialog(props) {
  const classes = useStyles(props);
  const [form, setForm] = useState({
    ipos: [0],
    propertyId: 0,
  });
  const dispatch = useDispatch();
  const ipostakes = useSelector(
    ({ profileListing }) => profileListing.ipostakes
  );
  const dialog = ipostakes.mergeSublotDialog;
  const { data } = dialog;
  const userBoxlots = ipostakes.userBoxlots;

  useEffect(() => {
    if (dialog.data) {
      dispatch(Actions.getUserIpoStakes(dialog.data.id));
    }
    return () => {};
  }, [dialog.data, dispatch]);

  const handleChange = (i) => (event) => {
    let ipos = [...form.ipos];
    ipos.splice(i, 1, event.target.value);
    setForm({ ...form, ipos });
  };

  const addBoxlot = () => {
    setForm({ ...form, ipos: [...form.ipos, 0] });
  };

  const removeBoxlot = (i) => () => {
    let ipos = [...form.ipos];
    ipos.splice(i, 1);
    setForm({ ...form, ipos });
  };

  return (
    <Dialog
      className={classes.root}
      open={dialog.open}
      onClose={() => dispatch(Actions.closeMergeSublotDialog())}
      aria-labelledby="merge-subslots"
      // fullWidth
      // maxWidth="sm"
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
                  <TableCell>{data && data.propertyRef}</TableCell>
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
                  <TableCell>
                    {data && BoxUtils.formatCurrency(data.price)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {form.ipos.map((ipo, i) => (
            <div
              key={i}
              className="flex justify-between items-center space-x-2"
            >
              <TextField
                id={`merge-boxlots-${i}`}
                select
                label="Boxlots"
                name="ipos"
                value={ipo}
                onChange={handleChange(i)}
                variant="outlined"
                margin="dense"
                fullWidth
                classes={{ root: "w-64" }}
              >
                <MenuItem value="0">Select Boxlot</MenuItem>
                {userBoxlots.entities.map((boxlot) => (
                  <MenuItem key={boxlot.id} value={boxlot.id}>
                    <ListItemText
                      primary={`#${boxlot.ipoRef} — ${BoxUtils.formatCurrency(
                        boxlot.purchaseAmount
                      )}`}
                      secondary={
                        <span>No. of units: {boxlot.noOfUnitsPurchased}</span>
                      }
                    />
                  </MenuItem>
                ))}
              </TextField>
              <IconButton onClick={removeBoxlot(i)}>
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          <AppButton
            size="small"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={addBoxlot}
          >
            Add Boxlot
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
          Merge boxlots
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default MergeBoxlotDialog;
