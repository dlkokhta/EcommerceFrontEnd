import { configureStore } from "@reduxjs/toolkit";
import userNameReducer from "./userNameSlice";
import allShoesSlice from "./allShoesSlice";
import cartItemsSlice from "./cartItemsSlice";
import filterBygenderSlice from "./filterByGenderSlice";

const store = configureStore({
  reducer: {
    userName: userNameReducer,
    allShoes: allShoesSlice,
    cartItems: cartItemsSlice,
    filterByGender: filterBygenderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
