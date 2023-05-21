import { combineReducers } from "redux";
import { userSlice } from "./userReducer.jsx";
import { postSlice } from "./postReducer.jsx";
import { chatSlice } from "./chatReducer.jsx";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
  chat: chatSlice.reducer,
});
