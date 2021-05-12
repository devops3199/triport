import React from "react";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; 

const BoardView = (props) => {
    const { content } = props;

    return (
        
        <Viewer initialValue={content} />
        
    );
};

export default BoardView;