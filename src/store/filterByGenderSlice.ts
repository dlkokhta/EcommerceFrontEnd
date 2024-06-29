import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterByGenderTypes } from "../types/filterByGenderTypes";

const initialState: filterByGenderTypes = {
  filterByGenderValue: "",
};

const filterByGenderSlice = createSlice({
  name: `filterByGender`,
  initialState,
  reducers: {
    setFilterByGender: (state, action: PayloadAction<string>) => {
      state.filterByGenderValue = action.payload;
    },
  },
});

export const { setFilterByGender } = filterByGenderSlice.actions;
export default filterByGenderSlice.reducer;
