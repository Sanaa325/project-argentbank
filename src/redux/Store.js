import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/LoginSlice";
import userReducer from "../redux/UserSlice";

export const Store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});
export default Store;