import React from "react";
import styled from "styled-components";
import { BoardCard } from 'components/components';

const BoardMain = (props) => {
    return (
        <BoardMainContainer>
            <BoardCard />
            <BoardCard />
            <BoardCard />
        </BoardMainContainer>
    );
};

const BoardMainContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
`;

export default BoardMain;