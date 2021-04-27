import React from 'react';
import styled from 'styled-components';
import { actionCreators as boardActions } from 'redux/modules/Board';
import { useDispatch } from 'react-redux';

const Main = (props) => {
    const dispatch = useDispatch();

    const test = () => {
        dispatch(boardActions.getBoardList(1));
    };

    return (
        <h1 onClick={test}>테스트 버튼</h1>
    );
};

export default Main;