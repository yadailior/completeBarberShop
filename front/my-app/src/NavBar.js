import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logOutAsync,
  selectToken,
  openLoginModal,
} from "./features/form/formSlice";
import {
  openCalendarModal,
  closeCalendarModal,
  openBookingData,
  getbookingAsync,
  selectBooking,
  openBookingCalendar,
  getCalendarAsync
} from "./features/booking/BookNowSlice";

import Badge from '@mui/material/Badge';
const NavBar = () => {
  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const bookingCount = useSelector(selectBooking);
  const logged = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  const logOut = () => {
    let out = dispatch(logOutAsync());
    let res = dispatch(closeCalendarModal());
    navigate("/");
  };
  
  const setBookingData = () => {
    let open = dispatch(openBookingData());
  };
  const setBookingCalendar = () => {
    let open = dispatch(openBookingCalendar());
  };
 
  
  useEffect(() => {
    
    if (admin) {
      
      
      const setCalendar=dispatch(getCalendarAsync())
    }
    const setData =dispatch(getbookingAsync())
  }, [admin,dispatch]);
  
 
 
  /* eslint-enable no-unused-vars */
  return (
    <div id="page-top">
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          {/* eslint-disable-next-line */}
          <a className="navbar-brand" href="">
            Barbershop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars ms-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  CONTACT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  GALLERY
                </a>
              </li>
              <li className="nav-item">
                {logged ? (
                  <Link
                    className="nav-link"
                    to="/BookNow"
                    onClick={() => dispatch(openCalendarModal())}
                  >
                    book now
                  </Link>
                ) : (
                  <Link
                    className="nav-link"
                    to="/LoginForm"
                    onClick={() => dispatch(openLoginModal())}
                  >
                    book now
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {logged ? (
                  <Badge badgeContent={bookingCount.length} color="primary"  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                  <Link
                    className="nav-link"
                    to="/BookingData"
                    onClick={() => setBookingData()}
                  >
                    My books
                  </Link></Badge>
                ) : null}
              </li>
              
              <li className="nav-item">
                
                {admin === "true" ?(

                  <Link
                    className="nav-link"
                    to="/BookingCalendar"
                    onClick={() => setBookingCalendar()}
                  >
                    Calendar
                  </Link>):null
                 }
              </li>
              {logged ? (
                <button
                  className="btn btn-primary btn-m "
                  style={{
                    marginRight: "-125px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => logOut({ token })}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-m "
                  style={{ marginRight: "-125px" }}
                >
                  {" "}
                  <Link
                    to="/LoginForm"
                    style={{ color: "black", fontWeight: "bold" }}
                    onClick={() => dispatch(openLoginModal())}
                  >
                    Login/Register
                  </Link>
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
