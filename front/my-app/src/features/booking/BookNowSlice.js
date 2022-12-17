import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { date, booking, getbooking, deleteBooking,getCalendar } from "./BookNowAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  showCalendar: false,
  showHoursList: [],
  showConfirm: false,
  showBooking: false,
  showBookingCalendar: false,
  selectDay: "",
  selectHour: "",
  showConfirmModal: false,
  bookingData: [],
  toast:false,
  bookingForToast:{},
  BookingCalendar:{}
};

export const dateAsync = createAsyncThunk(
  "book/date",

  async (temp_data) => {
    // console.log(temp_data)
    const response = await date(temp_data);

    return response.data;
  }
);

export const bookingAsync = createAsyncThunk(
  "book/booking",

  async (data) => {
    // console.log(data);
    let token = data.user;
    // console.log(token);
    data["user"] = jwt_decode(token).user_id;
    // console.log(data);

    const response = await booking(data, token);

    return response.data;
  }
);
export const getbookingAsync = createAsyncThunk(
  "book/getbooking",

  async () => {
    // console.log(localStorage.getItem("token"));
    let data = {};
    data["user"] = jwt_decode(localStorage.getItem("token")).user_id;
    // console.log(data);

    const response = await getbooking(localStorage.getItem("token"));

    return response.data;
  }
);

export const deleteBookingAsync = createAsyncThunk(
  "book/deleteBooking",

  async (data) => {
    // console.log(data);
    let token = localStorage.getItem("token");

    const response = await deleteBooking(data, token);

    return response.data;
  }
);

export const getCalendarAsync = createAsyncThunk(
  "book/getCalendar",

  async () => {

    const response = await getCalendar( );

    return response.data;
  }
);

export const BookNowSlice = createSlice({
  name: "book",
  initialState,

  reducers: {
    // opencalendarModal
    openCalendarModal: (state) => {
      state.showCalendar = true;
    },
    // closecalendarModal
    closeCalendarModal: (state) => {
      state.showCalendar = false;
      state.showConfirm = false;
    },
    openConfirmModal: (state) => {
      state.showConfirm = true;
    },
    addDate: (state, action) => {
      state.selectDay = action.payload;
      // console.log(action.payload);
    },
    addHour: (state, action) => {
      state.selectHour = action.payload;
      // console.log(action.payload);
    },
    closeConfirmModal: (state) => {
      state.showConfirmModal = false;
    },
    openBookingData: (state) => {
      state.showBooking = true;
    },
    closeBookingData: (state) => {
      state.showBooking = false;
    },
    openBookingCalendar: (state) => {
      state.showBookingCalendar = true;
    },
    closeBookingCalendar: (state) => {
      state.showBookingCalendar = false;
    },
    closeBookingToast: (state) => {
      state.toast = false;
    },
   
  },

  extraReducers: (builder) => {
    builder

      .addCase(dateAsync.fulfilled, (state, action) => {
        // console.log(typeof(action.payload.hours));
        // console.log(action.payload.hours[0]);
        // console.log(Array.isArray(action.payload.hours));
        if (Array.isArray(action.payload.hours)) {
          let tempVar = action.payload.hours;
          let hourList = [];
          for (let hour = 0; hour < tempVar.length; hour++) {
            hourList.push(tempVar[hour]);
          }
          // console.log(hourList);
          state.showHoursList = JSON.parse(JSON.stringify(hourList));
        } else {
          let hourList = action.payload.hours.replace(/'/g, '"'); //replacing all ' with "
          // console.log(hourList);
          state.showHoursList = JSON.parse(hourList);
        }

        // console.log(  state.showHoursList)
        state.showConfirm = false;
        state.selectHour = "";
      })
      .addCase(bookingAsync.fulfilled, (state, action) => {
        state.showCalendar = false;
        state.showConfirm = false;
        state.showConfirmModal = true;
        state.toast=true
        state.bookingForToast=action.payload
        // console.log(action.payload);

        
      })

      .addCase(getbookingAsync.fulfilled, (state, action) => {
        state.bookingData = action.payload;
        // console.log(action.payload);
      })
      .addCase(deleteBookingAsync.fulfilled, (state, action) => {
        state.showBooking = false;
        // console.log(action.payload);
      })
      .addCase(getCalendarAsync.fulfilled, (state, action) => {
        state.BookingCalendar=action.payload['booking']
        // console.log(action.payload['booking']);
      });
  },
});
export const {
  openCalendarModal,
  closeCalendarModal,
  openConfirmModal,
  addDate,
  addHour,
  closeConfirmModal,
  openBookingData,
  closeBookingData,
  closeBookingToast,
  openBookingCalendar,
  closeBookingCalendar
  
} = BookNowSlice.actions;

export const selectshowDate = (state) => state.book.showDate;

export const selectshowHoursList = (state) => state.book.showHoursList;

export const selectshowCalendar = (state) => state.book.showCalendar;

export const selectshowConfirm = (state) => state.book.showConfirm;

export const showConfirmModal = (state) => state.book.showConfirmModal;

export const selectDay = (state) => state.book.selectDay;

export const selectHour = (state) => state.book.selectHour;

export const selectBooking = (state) => state.book.bookingData;

export const selectshowBooking = (state) => state.book.showBooking;

export const selectshowBookingCalendar = (state) => state.book.showBookingCalendar;

export const selectBookingCalendar = (state) => state.book.BookingCalendar;

export const selectBookingToast = (state) => state.book.toast;

export const selectbookingForToast = (state) => state.book.bookingForToast;

export default BookNowSlice.reducer;
