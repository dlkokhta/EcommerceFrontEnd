import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newShoesTypes } from "../types/newShoesTypes";

const initialState: newShoesTypes = {
  newShoesValue: false,
};

const newShoesSlice = createSlice({
  name: "newShoes",
  initialState,
  reducers: {
    setnewShoes: (state, action: PayloadAction<boolean>) => {
      state.newShoesValue = action.payload;
    },
  },
});

export const { setnewShoes } = newShoesSlice.actions;
export default newShoesSlice.reducer;
