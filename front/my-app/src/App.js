import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Contact from "./Contact";
import Footer from "./Footer";
import Gallery from "./features/gallery/Gallery";
import {
  selectShow,
  selectShowLogin,
  selectLoginToast,
  closeToast,
} from "./features/form/formSlice";
import {
  selectshowCalendar,
  selectshowBooking,
  selectBookingToast,
  closeBookingToast,
  selectbookingForToast,
  selectshowBookingCalendar,
} from "./features/booking/BookNowSlice";
import { useSelector, useDispatch } from "react-redux";
import BookNow from "./features/booking/BookNow";
import BookingData from "./features/booking/BookingData";
import RegisterForm from "./features/form/RegisterForm";
import LoginForm from "./features/form/LoginForm";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingCalendar from "./features/booking/BookingCalendar";
function App() {
  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();
  const show = useSelector(selectShow);
  const showLogin = useSelector(selectShowLogin);
  const showCalendar = useSelector(selectshowCalendar);
  const showBookingData = useSelector(selectshowBooking);
  const showBookingCalendar = useSelector(selectshowBookingCalendar);
  const showLoginToast = useSelector(selectLoginToast);
  const showBookingToast = useSelector(selectBookingToast);
  const showbookingForToast = useSelector(selectbookingForToast);

  if (showLoginToast) {
    toast.success("Login success", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    let res = dispatch(closeToast());
  }
  if (showBookingToast) {
    toast.success(
      `
  Booked success,  
  Booked date:${showbookingForToast.date}  
  Booked hour:${showbookingForToast.hour}`,
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
    let res = dispatch(closeBookingToast());
  }

  return (
    <div>
      {/* Navigation */}
      <NavBar></NavBar>
      {/* <!-- Masthead--> */}
      <Header></Header>
      {/* <!-- Contact--> */}
      <Contact></Contact>
      {/* <!-- Portfolio Grid--> */}
      <Gallery></Gallery>
      {/* <!-- Footer--> */}
      <Footer></Footer>
      <RegisterForm show={show}></RegisterForm>
      <LoginForm showLogin={showLogin}></LoginForm>
      <BookNow showCalendar={showCalendar}></BookNow>
      <BookingData showBooking={showBookingData}></BookingData>
      <BookingCalendar
        showBookingCalendar={showBookingCalendar}
      ></BookingCalendar>
      <ToastContainer />
    </div>
  );
}

export default App;
