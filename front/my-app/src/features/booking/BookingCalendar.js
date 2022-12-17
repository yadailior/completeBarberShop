import React, { forwardRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/he";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  closeBookingCalendar,
  selectBookingCalendar,
  selectshowBookingCalendar,
} from "./BookNowSlice";
import "react-big-calendar/lib/css/react-big-calendar.css";

// slide emotion
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookingCalendar = (props) => {
  /* eslint-disable no-unused-vars */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendar = useSelector(selectshowBookingCalendar);
  const bookingData = useSelector(selectBookingCalendar);
  const localizer = momentLocalizer(moment);
  const now = new Date();
  const events = [];
  const handleClose = () => {
    let close = dispatch(closeBookingCalendar());
    navigate("/");
    
  };
  useEffect(() => {
    for (const [key, value] of Object.entries(bookingData)) {
      // console.log(key,value)
      const [day, month, year] = key.split(".");
      for (let index = 0; index < value.length; index++) {
        // console.log(value[index]['user_name']);
        let time = value[index]["book_hour"];
        const [hour, min] = time.split(":");
        // console.log(hour, min);
        // console.log(new Date(+year,+month - 1,+day,hour,min))
        let date = new Date(+year, +month - 1, +day, hour, min);
        events.push({
          title: `${value[index]["username"]}`,
          start: new Date(date.setMinutes(date.getMinutes() - 15)),
          end: new Date(date.setMinutes(date.getMinutes() + 15)),
        });
      }
    }
  });
  if (!props.showBookingCalendar) {
    return null;
  }

  return (
    <div>
      <Dialog fullScreen open={calendar} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ height: "500pt" }}>
          <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default BookingCalendar;
