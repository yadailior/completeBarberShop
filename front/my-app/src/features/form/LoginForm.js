import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import {
  logInAsync,
  closeLoginModal,
  closeLoginModalOpenRegister,
  setChecked,
} from "./formSlice";
// import Checkbox from "@mui/material/Checkbox";
import "../../App.css";
import { getbookingAsync } from "../booking/BookNowSlice";
const LoginForm = (props) => {
  /* eslint-disable no-unused-vars */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.checked) {
      // console.log(event.target.checked);
    } else {
      setChecked();
      // console.log(event.target.checked);
    }
  };
  // login the user
  const Login = async () => {
    let log = await dispatch(logInAsync({ username, password }));
    if (log.payload.detail){
      console.log(log.payload.detail);
      alert(log.payload.detail)
    }
    else{
dispatch(closeLoginModal());
navigate("/");
dispatch(getbookingAsync)
    }
    
    
    
  };
  const {
    register,
    reset,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // console.log(errors);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ username: "", password: "" });
    }
  }, [formState, reset]);
  // check show prop
  if (!props.showLogin) {
    return null;
  }

  /* eslint-enable no-unused-vars */
  return (
    <div className="modal">
      <div>
        <div className="box">
          <br />
          <Link to="/">
            <span
              className="close"
              title="Close Modal"
              onClick={() => dispatch(closeLoginModal())}
            >
              X
            </span>
          </Link>
          <div className="page">
            <div className="header">
              <Link id="login" className="active" to="/LoginForm">
                login
              </Link>
              <Link
                id="signup"
                to="/RegisterForm"
                onClick={() => dispatch(closeLoginModalOpenRegister())}
              >
                signup
              </Link>
            </div>
            <div className="content">
              <form
                className="login"
                name="loginForm"
                onSubmit={handleSubmit(() => {
                  Login();
                })}
                method="POST"
              >
                <input
                  {...register("username", {
                    required: "Phone Number is required",
                  })}
                  type="text"
                  name="username"
                  id="logName"
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
                  id="logPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
                {/* <div id="check">
                  <Checkbox
                    id="remember"
                    defaultChecked
                    onChange={handleChange}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div> */}
                <br />

                <input type="submit" value="Login" onChange={handleChange} />
                <Link to="/">Forgot Password?</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
