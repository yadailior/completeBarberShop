import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUp, logOut, doLogIn } from "./formAPI";
import jwt_decode from "jwt-decode";
const initialState = {
  token: "",
  logged: false,
  show: false,
  showLogin: false,
  admin: false,
  checked: true,
  toast:false
};

// register method
export const signUpAsync = createAsyncThunk(
  "form/signUp", async (newUser) => {
  
  const response = await signUp(newUser);

  return response.data;
});
// login method
export const logInAsync = createAsyncThunk(
  "form/doLogIn",

  async (loginData) => {
    // console.log(loginData);

    const response = await doLogIn(loginData);
    
    return await response.data;
  }
);
// logout method
export const logOutAsync = createAsyncThunk(
  "form/logOut",

  async () => {
    const response = await logOut();

    return response.data;
  }
);


export const formSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    // openRegisterModal
    openRegisterModal: (state) => {
      state.show = true;
    },
    // closeRegisterModal
    closeRegisterModal: (state) => {
      state.show = false;
    },
    // openLoginModal
    openLoginModal: (state) => {
      state.show = false;
      state.showLogin = true;
    },
    // closeLoginModal
    closeLoginModal: (state) => {
      state.showLogin = false;
    },
    // closeLoginModalOpenRegiste
    closeLoginModalOpenRegister: (state) => {
      state.showLogin = false;
      state.show = true;
    },
    setChecked: (state) => {
      state.checked = false;
    },
    closeToast: (state) => {
      state.toast = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(signUpAsync.fulfilled, (state, action) => {
        if (action.payload["error"]) {
          console.log(action.payload["error"]);
        } else {
          state.user = action.payload;
          state.logged = true;
        }
      })

      .addCase(logOutAsync.pending, (state, action) => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      })
     
      .addCase(logInAsync.fulfilled, (state, action) => { 
        if(action.payload['detail']){
          // console.log(action.payload['detail']);
        }
        else{
        state.logged = true
        state.token = action.payload.access
        // console.log(action.payload)
      
        localStorage.setItem("token", action.payload.access)
        localStorage.setItem("admin", jwt_decode(state.token).admin)

        state.admin = jwt_decode(state.token).admin
        state.toast=true}
      })
      
  },
});
export const {
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal,
  closeLoginModalOpenRegister,
  setChecked,
  closeToast
} = formSlice.actions;

export const selectLogged = (state) => state.form.logged;

export const selectShow = (state) => state.form.show;

export const selectShowLogin = (state) => state.form.showLogin;

export const selectToken = (state) => state.form.token;

export const selectAdmin = (state) => state.form.admin;

// export const selectChecked = (state) => state.form.checked;

export const selectLoginToast = (state) => state.form.toast;

export default formSlice.reducer;
