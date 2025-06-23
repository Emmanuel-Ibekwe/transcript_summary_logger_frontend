import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resetCodeId: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setResetCodeId: (state, action) => {
      state.resetCodeId = action.payload;
    },
    clearResetCodeId: (state, action) => {
      state.resetCodeId = null;
    },
  },
});

export const { setResetCodeId, clearResetCodeId } = passwordSlice.actions;
export default passwordSlice.reducer;
