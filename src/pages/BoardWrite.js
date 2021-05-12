import React from "react";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import { history } from "redux/configureStore";
import { actionCreators as TrilogActions, setTrilogFilter } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';
import { config } from "redux/modules/config";
import _ from "lodash";
import { BoardWriteMap } from "components/components";

const BoardWrite = (props) => {
    const dispatch = useDispatch();
    const is_loading = useSelector((state) => state.trilog.loading.detail_loading);
    const detail = useSelector((state) => state.trilog.detail);
    const id = props.match.params.id;
    const is_edit = id ? true: false;

    const data = React.useRef();

    const [title, setTitle] = React.useState('');
    const [address, setAddress] = React.useState('지도 마커를 클릭하시면 주소가 여기 표시됩니다.');
    const [keyword, setKeyword] = React.useState('관악구청');
    const [imageUrls, setImageUrls] = React.useState([]);

    const handleMap = _.debounce((val) => {
        setKeyword(val);
    }, 500);

    const sendData = async () => {
        if(title === "") {
            alert('제목을 입력하세요.');
            return;
        }
        
        const content = data.current.getInstance().getMarkdown();

        if(content === "") {
            alert('내용을 입력하세요.');
            return;
        }

        const post = {
            title : title,
            address : address,
            description : content,
            imageUrlList : imageUrls,
            is_edit : is_edit,
            id : id
        };

        dispatch(TrilogActions.addTrilog(post));
    };

    const uploadImage = async (blob) => {
        let api = '';

        if(is_edit) {
            api = `${config}/api/boards/image/${id}`;
        } else {
            api = `${config}/api/boards/image`;
        }

        const access_token = localStorage.getItem("access_token");

        const formData = new FormData();
        formData.append('imageFile', blob);

        const url = await fetch(api, {
            method : 'POST',
            headers : {
                'Authorization': `${access_token}`,
            },
            body : formData
        })
        .then(res => res.json())
        .catch((error) => console.log(error, 'uploadImage'));

        setImageUrls(prevState => ([...prevState, { 'imageFilePath' : url.results.imageFilePath}]))

        return url.results.imageFilePath;
    };


    React.useEffect(() => {
        if(is_edit) {
            dispatch(TrilogActions.getTrilogDetail(id));
            if(detail.information !== undefined) {
                setAddress(detail.information.address);
                setTitle(detail.information.title);
            }
        }
    }, []);

    return (
      <WriteContainer>
        {is_loading && is_edit ? (
          <></>
        ) : (
          <>
            <Title margin="0 0 1.25rem 0">
              {is_edit ? (<h2 style={{"textAlign":"center"}}>Trilog 수정</h2>) : (<h2 style={{"textAlign":"center"}}>Trilog 작성</h2>)}
            </Title>
            <Title margin="0 0 1.25rem 0">
              <span>제목</span>
            </Title>
            <InputContainer>
              <TitleInput
                id="title"
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputContainer>
            <Title margin="1.25rem 0 1.25rem 0">
              <span>위치</span>
            </Title>
            <InputContainer margin="0 0 1.5rem 0">
              <span>여행주소 : </span>
              <Address>{address}</Address>
            </InputContainer>
            <MapContainer>
              <MapInput
                type="text"
                placeholder="예) 장소/가게 이름 - 남산, 서울역 or 주소 - 서울시 관악구 관악로 145"
                onChange={(e) => {
                  handleMap(e.target.value);
                }}
              />
              <BoardWriteMap
                keyword={keyword}
                setAddress={setAddress}
                drag={true}
              />
            </MapContainer>
            <Title margin="1.25rem 0 1.25rem 0">
              <span>내용</span>
            </Title>
            <InputContainer>
              <Editor
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                initialValue={is_edit ? detail.information.description : ''}
                hooks={{
                  addImageBlobHook: async (blob, callback) => {
                    const upload = await uploadImage(blob);
                    callback(upload, "alt text");
                    return false;
                  },
                }}
                ref={data}
              />
            </InputContainer>
            <ButtonContainer>
              <ButtonComplete
                type="button"
                value={is_edit ? "수정완료" : "작성완료"}
                onClick={sendData}
              />
              <ButtonCancel
                type="button"
                value="취소"
                onClick={() => {
                  history.goBack();
                }}
              />
            </ButtonContainer>
          </>
        )}
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
  font-family: "paybooc-Bold";
  font-size: 15px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
`;

const InputContainer = styled.div`
  width: 100%;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
`;

const Address = styled.span`
  font-family: "AppleSDGothicNeoB";
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
  width: 30.938rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  box-sizing: border-box;
`;

const TitleInput = styled.input`
  width: 31.563rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3.563rem 0 4.2rem 0;
`;

const ButtonComplete = styled.input`
  cursor: pointer;
  background: #2b61e1 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 20.625rem;
  height: 3.063rem;
  color: #fff;
  outline: none;
  margin-right: 6.875rem;
  font-family: "paybooc-Bold";
  font-size: 15px;
`;

const ButtonCancel = styled.input`
  cursor: pointer;
  background: #707070 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #707070;
  border-radius: 5px;
  width: 20.625rem;
  height: 3.063rem;
  color: #fff;
  outline: none;
  font-family: "paybooc-Bold";
  font-size: 15px;
`;

export default BoardWrite;
