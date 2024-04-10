import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface allShoesTypes {
  brand: string;
  model: string;
  color: string;
  description: string;
  price: number;
  sizes: string[];
  availability: boolean;
  image: string[];
  id: string;
}

interface shoesTypes {
  shoes: allShoesTypes[];
}

const initialState: shoesTypes = {
  shoes: [],
};

const allShoesSlice = createSlice({
  name: "allShoes",
  initialState,
  reducers: {
    setAllShoes: (state, action: PayloadAction<allShoesTypes[]>) => {
      state.shoes = action.payload;
    },
  },
});

export const { setAllShoes } = allShoesSlice.actions;
export default allShoesSlice.reducer;
