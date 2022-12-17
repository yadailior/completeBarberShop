import React from "react";
import { Link } from "react-router-dom";
import { openRegisterModal } from "./features/form/formSlice";
import { openCalendarModal } from "./features/booking/BookNowSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">Welcome To Our Barbershop!</div>
          <div className="masthead-heading text-uppercase">
            where dreams come true{" "}
          </div>
          {localStorage.getItem("token") ? (
            <Link
              className="btn btn-primary btn-xl text-uppercase"
              to="/BookNow"
              onClick={() => dispatch(openCalendarModal())}
            >
              book now
            </Link>
          ) : (
            <Link
              className="btn btn-primary btn-xl text-uppercase"
              to="/RegisterForm"
              onClick={() => dispatch(openRegisterModal())}
            >
              book now
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
