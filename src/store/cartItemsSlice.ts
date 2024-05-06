import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItemsTypes } from "../types/cartItemsTypes";

const initialState: { cartItems: cartItemsTypes[] } = {
  cartItems: [],
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<cartItemsTypes[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItems } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
