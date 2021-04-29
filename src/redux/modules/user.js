import { createSlice } from "@reduxjs/toolkit";
import produce from "../../../node_modules/immer/dist/immer";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    SET_USER: (state, action) =>
      produce(state, (draft) => {
        state.user = action.payload;
      }),
  },
});

const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const one_user = {
      email: "",
      password: "",
    };
  };
};

const actionCreators = {
  loginCheck,
};

export const { SET_USER } = userSlice.actions;
export default userSlice.reducer;

export { actionCreators };
