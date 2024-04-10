import { configureStore } from "@reduxjs/toolkit";
import userNameReducer from "./userNameSlice";
import allShoesSlice from "./allShoesSlice";

const store = configureStore({
  reducer: {
    userName: userNameReducer,
    allShoes: allShoesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
