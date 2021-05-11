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
        detail : '',
        image_urls : [],
    },
    reducers: {
        SET_BOARD : (state, action) => produce(state, (draft) => {
            draft.list = action.payload;
        }),

        SET_DETAIL : (state, action) => produce(state, (draft) => {
            draft.detail = action.payload;
        }),

        SET_IMG_URL : (state, action) => produce(state, (draft) => {
            draft.image_urls.push(action.payload);
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

const setDetail = (detail) => {
    return function (dispatch, getState, { history }) {
        dispatch(SET_DETAIL(detail));
    };
};

const setImgUrl= (url) => {
    return function (dispatch, getState, { history }) {
        dispatch(SET_IMG_URL(url));
    };
};

const actionCreators = {
    getBoardList,
    setDetail,
    setImgUrl,
};

export const { SET_BOARD, SET_DETAIL, SET_IMG_URL } = boardSlice.actions;
export default boardSlice.reducer;
export { actionCreators };