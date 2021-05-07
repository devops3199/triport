import React from "react";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; 
import { useSelector } from 'react-redux';

const BoardView = (props) => {
    //const detail = useSelector((state) => state.board.detail);
    const detail = "## 블로그 테스트 \
    ![alt text](https://miro.medium.com/max/2400/1*I1L27Pep2spzSjbYr4w5nQ.png) \
    \
    * 오늘의 명소 \
    * 내일의 명소 \
    * 위치는 여기 ";

    React.useEffect(() => {
        console.log(detail);
    }, []);

    return (
        <Viewer 
            initialValue={detail}
        />
    );
};

export default BoardView;