import React from "react";
import styled, { ThemeConsumer } from "styled-components";
import { BoardWriteMap } from "components/components";
import { Editor } from '@toast-ui/react-editor';
import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

import { actionCreators as boardActions } from 'redux/modules/Board';
import { useDispatch } from 'react-redux';
import { history } from "redux/configureStore";
import _ from "lodash";


const BoardWrite = (props) => {
    const dispatch = useDispatch();
    const data = React.useRef();
    const title = React.useRef();

    const [address, setAddress] = React.useState('지도 마커를 클릭하시면 주소가 여기 표시됩니다.');
    const [keyword, setKeyword] = React.useState('관악구청');
    const [result, setResult] = React.useState(null);

    const handleMap = _.debounce((val) => {
        setKeyword(val);
    }, 500);

    const sendData = () => {
        if(title.current.value === "") {
            alert('제목을 입력하세요.');
            return;
        }
        console.log(address);
        console.log(data.current.getInstance().getMarkdown());
        // setResult(data.current.getInstance().getMarkdown());
        // dispatch(boardActions.setDetail(data.current.getInstance().getMarkdown()));
        // history.push("/trilog/1");
    };

    const uploadImage = (blob) => {
        let formData = new FormData();
        formData.append('image', blob);
        console.log(formData.get('image'));
        // mehtod : POST
        // data : formData
        // headers : {'Content-type':'multipart/form-data'}
    };

    return(
        <WriteContainer>
            <Title>
                <h3>제목</h3>
            </Title>
            <InputContainer>
                <TitleInput type="text" placeholder="제목을 입력해주세요" ref={title} />
            </InputContainer>
            <Title>
                <h3>위치</h3>
            </Title>
            <InputContainer>
                <span>{address}</span>
            </InputContainer>
            <MapContainer>
                <MapInput type="text" placeholder="예) 장소/가게 이름 - 남산, 서울역 or 주소 - 서울시 관악구 관악로 145" onChange={(e) => { handleMap(e.target.value) }} />
                <BoardWriteMap keyword={keyword} setAddress={setAddress} drag={true} />
            </MapContainer>
            <Title>
                <h3>내용</h3>
            </Title>
            <InputContainer>
                <Editor
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {
                            console.log(blob);
                            uploadImage(blob);
                            const upload = "https://miro.medium.com/max/2400/1*I1L27Pep2spzSjbYr4w5nQ.png";
                            callback(upload, "alt text");
                            return false;
                        }
                    }}
                    ref={data}
                />
            </InputContainer>
            <ButtonContainer>
                <input type="button" value="작성완료" onClick={sendData} />
                <input type="button" value="취소" />
            </ButtonContainer>
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

const MapContainer = styled.div`
    position: relative;
    width: 100%; 
`;

const MapInput = styled.input`
    position: absolute;
    z-index: 2;
    top: 10px;
    left: 10px;
    width: 500px;
    border: 1px solid rgb(43, 97, 225, .6);
    border-radius: 5px;
    outline: none;
    padding: .75rem 1.25rem;
    box-sizing: border-box;
`;

const TitleInput = styled.input`
    width: 100%;
    border: 1px solid rgb(43, 97, 225, .6);
    border-radius: 5px;
    outline: none;
    padding: .75rem 1.25rem;
    box-sizing: border-box;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1.25rem;

    & input {
        cursor: pointer;
        background-color: rgb(43, 97, 225);
        border: 1px solid rgb(43, 97, 225);
        border-radius: 5px;
        box-sizing: border-box;
        outline: none;
        color: #fff;
        padding: .75rem 2.25rem;
        margin: 0 1rem;
    }
`;

export default BoardWrite;