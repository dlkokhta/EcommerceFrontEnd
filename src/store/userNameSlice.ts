import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userNameSlice {
  userNameValue: string;
}
const initialState: userNameSlice = {
  userNameValue: "",
};

const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userNameValue = action.payload;
    },
  },
});

export const { setUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
