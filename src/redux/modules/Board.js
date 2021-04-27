import { createSlice } from "@reduxjs/toolkit";
import { produce } from 'immer'; // 불변성 유지

/* 게시판 */
const boardSlice = createSlice({
    name : "board",
    initialState : {
        list : {
            board_list : [],
            is_last : false,
        },
    },
    reducers: {
        SET_BOARD : (state, action) => produce(state, (draft) => {
            draft.list = action.payload;
        }),
    },
});

const getBoardList = (page) => {
    return function (dispatch, getState, { history }) {
        const board = {
            board_list : ['test1', 'test2', 'test3'],
            is_last : true,
        };

        dispatch(SET_BOARD(board));
    };
};

const actionCreators = {
    getBoardList,
};

export const { SET_BOARD } = boardSlice.actions;
export default boardSlice.reducer;
export { actionCreators };