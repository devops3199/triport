import React from "react";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; 
import { useSelector } from 'react-redux';

const ViewTest = (props) => {
    const detail = useSelector((state) => state.board.detail);

    React.useEffect(() => {
        console.log(detail);
    }, []);

    return (
        <Viewer 
            initialValue={detail}
        />
    );
};

export default ViewTest;