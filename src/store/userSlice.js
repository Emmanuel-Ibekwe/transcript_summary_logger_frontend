import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const user = action.payload;
      state._id = user._id;
      state.name = user.name;
      state.email = user.email;
      state.accessToken = user.accessToken;
      state.refreshToken = user.refreshToken;
    },
    logout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
