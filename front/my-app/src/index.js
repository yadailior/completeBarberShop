import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./features/form/RegisterForm";
import LoginForm from "./features/form/LoginForm";
import BookNow from "./features/booking/BookNow";
import BookingData from "./features/booking/BookingData";
import BookingCalendar from "./features/booking/BookingCalendar";
import './App.css';

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/BookNow" element={<BookNow />} />
            <Route path="/BookingData" element={<BookingData />} />
            <Route path="/BookingCalendar" element={<BookingCalendar />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/LoginForm" element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

