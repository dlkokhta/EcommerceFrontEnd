import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterShoesTypes } from "../types/filterShoesTypes";

const initialState: filterShoesTypes = {
  filterShoesValue: "",
};

const filterShoesSlice = createSlice({
  name: `filterShoes`,
  initialState,
  reducers: {
    setFilterShoes: (state, action: PayloadAction<string>) => {
      state.filterShoesValue = action.payload;
    },
  },
});

export const { setFilterShoes } = filterShoesSlice.actions;
export default filterShoesSlice.reducer;
