import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeCalendarModal, dateAsync, addDate } from "./BookNowSlice";
import { Link } from "react-router-dom";
import Time from "./Time.js";
import "../../App.css";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
const BookNow = (props) => {
  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const handleChange = async (event) => {
    // console.log(event.$d);
    
    setDate(event.$d);
    let hours = dispatch(dateAsync({ date: event.$d.toLocaleDateString() }));

    let res = setShowTime(true);
    // // console.log(event.toLocaleDateString());

    let day = dispatch(addDate(event.$d.toLocaleDateString()));
  };
  const setDefualt = async () => {
    let temp = dispatch(closeCalendarModal());
    setShowTime(false);
    setDate(new Date())
    
  };
  
  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 1 || day === 6;
  };

 
  
 
  // check show prop
  if (!props.showCalendar) {
    return null;
  }
  /* eslint-enable no-unused-vars */
  return (
    <div className="modal">
      <div className="modal-content" style={{ width: "auto" }}>
      <Link to="/">
          <span className="closeCaln" title="Close Modal" onClick={setDefualt}>
            X
          </span>
        </Link>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={date}
        shouldDisableDate={isWeekend}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
        disablePast
        
        />
    </LocalizationProvider>
    
        <Time showTime={showTime} date={date.toLocaleDateString()} />
      </div>
    </div>
  );
};

export default BookNow;
