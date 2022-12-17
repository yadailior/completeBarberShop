import React, { useState, useRef, useEffect } from "react";

import "../../App.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useTheme } from "@mui/material/styles";
import {
  selectshowHoursList,
  openConfirmModal,
  selectshowConfirm,
  addHour,
  bookingAsync,
  getbookingAsync,
  dateAsync,
  getCalendarAsync
} from "./BookNowSlice";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

const Times = (props) => {
  const confirm = useSelector(selectshowConfirm);
  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();
  const hourList = useSelector(selectshowHoursList);

  const [hour, setHour] = useState("");

  const [query, setQuery] = useState("idle");

  const [show, setShow] = useState(false);

  const timerRef = useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleClickQuery = () => {
    setShow(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }

    setQuery("progress");
    timerRef.current = window.setTimeout(() => {
      setQuery("success");
      const bookTime = async () => {
        let book = await dispatch(
          bookingAsync({
            user: localStorage.getItem("token"),
            book_date: props.date,
            book_hour: hour,
          })

        );
        let setBooking =dispatch(getbookingAsync())
        let setHour= await dispatch(dateAsync({date:props.date}))
        let setCalendar =await(dispatch(getCalendarAsync()))
        // console.log(props.date);
        // console.log(hour);
      };

      bookTime();
    }, 3500);
  };

  const handleChange = (event) => {
    setHour(event.target.value);
    let pickedHour = dispatch(addHour(event.target.value));
    // console.log(event.target.value);

    let open = dispatch(openConfirmModal());
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="times">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">pick your hour</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={hour}
            label="hour"
            onChange={handleChange}
          >
            {hourList.map((times, index) => {
              return (
                <MenuItem
                  key={index}
                  variant="outlined"
                  size="small"
                  value={times}
                >
                  {" "}
                  {times}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {confirm ? (
        <Button className="confirm" onClick={handleClickOpen}>
          Confirm
        </Button>
      ) : null}
      <Box sx={{ minWidth: 120 }}>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            One More Step..
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <CalendarMonthIcon /> Date:{props.date}
              <br />
              <br />
              <WatchLaterIcon /> Hour :{hour}
              <Box sx={{ height: 30 }}>
                {query !== "success" ? (
                  <Fade
                    in={query === "progress"}
                    style={{
                      transitionDelay: query === "progress" ? "500ms" : "0ms",
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                ) : null}
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={show} autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClickQuery}>
              {query !== "idle" ? "Pending.." : "Agree"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Times;
