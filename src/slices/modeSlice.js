import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    value: localStorage.getItem("dark_mode") || false,
  },
  reducers: {
    changeMode: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.

      state.value = !state.value;

      //console.log(state.value);

      localStorage.setItem("dark_mode", state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
