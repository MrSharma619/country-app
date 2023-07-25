import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../slices/modeSlice";

export default configureStore({
  reducer: {
    mode: modeReducer,
  },
});
