import React, { useState } from "react";
import "../../App.css";
import { selectDay, selectHour, closeConfirmModal } from "./BookNowSlice";
import { useDispatch, useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Confirm = (props) => {
  /* eslint-disable no-unused-vars */
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const day = useSelector(selectDay);
  const hour = useSelector(selectHour);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    let res = dispatch(closeConfirmModal());
  };
  if (!props.showConfirm) {
    return null;
  }
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"See You Soon.."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Just to remind.
            <CalendarMonthIcon /> Date:{day}
            <WatchLaterIcon /> Hour :{hour}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
