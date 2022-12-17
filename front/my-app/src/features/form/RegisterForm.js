import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signUpAsync,
  logInAsync,
  closeRegisterModal,
  openLoginModal,
} from "./formSlice";
import { Link } from "react-router-dom";
import "../../App.css";
import { getbookingAsync } from "../booking/BookNowSlice";

const RegisterForm = (props) => {
  /* eslint-disable no-unused-vars */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [First_Name, setFirst_Name] = useState("");
  const [Last_Name, setLast_Name] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  // send user info to server and log in automaticlly after
  const registerLogin = async () => {
    let regist = await dispatch(
      // register method call
      signUpAsync({
        email: email,
        First_Name: First_Name,
        Last_Name: Last_Name,
        username: username,
        password: password,
      })
    ).then(async (payload) => {
      if (payload["payload"].error) {
        // payload['payload'].error
        alert(payload["payload"].error);
      } else {
        // log in method call
        const log = await dispatch(logInAsync({ username, password })).then(
          dispatch(closeRegisterModal()),
          navigate("/"),
          dispatch(getbookingAsync)
        );
      }
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
    }
  }, [formState, reset]);
  // check show prop
  if (!props.show) {
    return null;
  }
  /* eslint-enable no-unused-vars */
  return (
    <div className="modal">
      <div >
        <div className="box" >
          <br />

          <Link to="/">
            <span
              className="close"
              title="Close Modal"
              onClick={() => dispatch(closeRegisterModal())}
            >
              X
            </span>
          </Link>
          <div className="page">
            <div className="header">
              <Link
                id="login"
                to="/LoginForm"
                onClick={() => dispatch(openLoginModal())}
              >
                login
              </Link>
              <Link id="signup" className="active" to="/RegisterForm">
                signup
              </Link>
            </div>
            <div className="content">
              <form
                className="login"
                name="signupForm"
                onSubmit={handleSubmit(() => registerLogin())}
                method="POST"
              >
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  id="First_Name"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => setFirst_Name(e.target.value)}
                />
                <p style={{ color: "red" }}>{errors.firstName?.message}</p>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  id="Last_Name"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) => setLast_Name(e.target.value)}
                />
                <p style={{ color: "red" }}>{errors.lastName?.message}</p>
                <input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  type="email"
                  name="email"
                  id="signEmail"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
                <input
                  {...register("username", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/i,
                      message: "Numeric characters only",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone Number cannot exceed 10 characters",
                    },
                  })}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Phone Number"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p style={{ color: "red" }}>{errors.username?.message}</p>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
                <br />
                <input type="submit" value="SignUp" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
