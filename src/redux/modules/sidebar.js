import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    setting: true,
    write: false,
    like: false,
  },
  reducers: {
    CLICK_SETTING: (state, action) => {
      state.setting = true;
    },
    CLICK_WRITE: (state, action) => {
      state.write = true;
    },
    CLICK_LIKE: (state, action) => {
      state.like = true;
    },
  },
});

export const { CLICK_SETTING, CLICK_WRITE, CLICK_LIKE } = sidebarSlice.actions;

export default sidebarSlice.reducer;
