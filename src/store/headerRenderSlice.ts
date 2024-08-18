import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface renderStateType {
  initialValue: boolean;
}

const initialState: renderStateType = {
  initialValue: false,
};

const headerRenderSlice = createSlice({
  name: "renderHeader",
  initialState,
  reducers: {
    setrenderHeader: (state, action: PayloadAction<boolean>) => {
      state.initialValue = action.payload;
    },
  },
});

export const { setrenderHeader } = headerRenderSlice.actions;
export default headerRenderSlice.reducer;
