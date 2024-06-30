import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterShoesByBrandTypes } from "../types/filterShoesByBrandTypes";

const initialState: filterShoesByBrandTypes = {
  filterShoesByBrandValue: "",
};

const filterShoesByBrandSlice = createSlice({
  name: `filterShoesByBrand`,
  initialState,
  reducers: {
    setFilterShoesByBrand: (state, action: PayloadAction<string>) => {
      state.filterShoesByBrandValue = action.payload;
    },
  },
});

export const { setFilterShoesByBrand } = filterShoesByBrandSlice.actions;
export default filterShoesByBrandSlice.reducer;
