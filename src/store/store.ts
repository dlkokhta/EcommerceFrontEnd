import { configureStore } from "@reduxjs/toolkit";

import userNameReducer from "./userNameSlice";

const store = configureStore({
  reducer: {
    userName: userNameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
