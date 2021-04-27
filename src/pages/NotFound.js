import React from "react";
import styled from 'styled-components';

const NotFound = (props) => {
    return (
        <Container>
            <h1>그런 페이지는 없습니다..</h1>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
`;

export default NotFound;