import React,{ forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {dateAsync,
  closeBookingData,
  selectshowBooking,
  selectBooking,
  deleteBookingAsync,
  getbookingAsync,
  getCalendarAsync
} from "./BookNowSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookingData = (props) => {
  /* eslint-disable no-unused-vars */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector(selectshowBooking);
  const bookingData = useSelector(selectBooking);
  const handleClose = () => {
    let close = dispatch(closeBookingData());
    navigate("/");
  };
  const cancleBooking = async (bookData) => {
    let cancle = await dispatch(deleteBookingAsync(bookData));
    let setBooking =await dispatch(getbookingAsync())
    let setHour= await dispatch(dateAsync({date:bookData.book_date}))
    let setCalendar =await(dispatch(getCalendarAsync()))
    console.log(bookData);
    navigate("/");
  };
  
  if (!props.showBooking) {
    return null;
  }
  
  

  return (
    <div>
      <Dialog fullScreen open={booking} TransitionComponent={Transition}>
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
        <List>
          {bookingData.map((book) => {
            return (
              
              <>
                <ListItem>
                  <ListItemText
                    primary={book.book_date}
                    secondary={book.book_hour}
                  />
                  <button
                    className="btn btn-primary btn-m"
                    onClick={() => cancleBooking(book)}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Cancle Booking
                  </button>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Dialog>
    </div>
  );
};

export default BookingData;
