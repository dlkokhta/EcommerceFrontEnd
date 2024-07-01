import { configureStore } from "@reduxjs/toolkit";
import userNameReducer from "./userNameSlice";
import allShoesSlice from "./allShoesSlice";
import cartItemsSlice from "./cartItemsSlice";
import filterShoesSlice from "./filterShoesSlice";
import filterShoesByBrandSlice from "./filterShoesByBrandSlice";
import newShoesSlice from "./newShoesSlice";

const store = configureStore({
  reducer: {
    userName: userNameReducer,
    allShoes: allShoesSlice,
    cartItems: cartItemsSlice,
    filterShoes: filterShoesSlice,
    filterShoesByBrand: filterShoesByBrandSlice,
    newShoes: newShoesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
