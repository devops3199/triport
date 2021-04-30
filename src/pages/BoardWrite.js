import React from "react";
import styled from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BoardWrite = (props) => {
    return(
        <WriteContainer>
            <Title>
                <h3>제목</h3>
            </Title>
            <InputContainer>
                <TitleInput type="text" placeholder="제목을 입력해주세요" />
            </InputContainer>
            <Title>
                <h3>내용</h3>
            </Title>
            <InputContainer>
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </InputContainer>
            <div>
                <button>작성 완료</button>
            </div>
        </WriteContainer>
    );
};

const WriteContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    position: relative;
`;

const Title = styled.div`
    width: 100%;
`;

const InputContainer = styled.div`
    width: 100%;   
`;

const TitleInput = styled.input`
    width: 100%;
    border: 1px solid rgb(43, 97, 225, .6);
    border-radius: 5px;
    outline: none;
    padding: .75rem 1.25rem;
`;

export default BoardWrite;