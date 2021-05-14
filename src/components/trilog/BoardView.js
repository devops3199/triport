import React from "react";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; 
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const BoardView = (props) => {
    const { content } = props;

    return (
        <Viewer initialValue={content} plugins={[codeSyntaxHighlight]} />
    );
};

export default BoardView;