import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAction, registerAction, forgetAction } from "../../api/login";

const initialState = {
  isLogin: false,
};

export const userLogin = createAsyncThunk("user/userLogin", async (params) => {
  const res = await loginAction(params);
  return res;
});

export const userRegister = createAsyncThunk(
  "user/register",
  async (params) => {
    const res = await registerAction(params);
    return res;
  }
);

export const userForget = createAsyncThunk("user/Forget", async (params) => {
  const res = await forgetAction(params);
  return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.data = action.payload;
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
    },
    clearUser: (state) => {
      state.isLogin = false;
      localStorage.setItem("isLogin", false);
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      if (payload.code === 200) {
        state.isLogin = true;
        localStorage.setItem("isLogin", true);
      }
    });
  },
});

export const { setAuth, clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
