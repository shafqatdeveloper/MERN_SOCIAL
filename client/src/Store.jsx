import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./assets/Redux/Reducers/index.js";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
