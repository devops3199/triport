import React from "react";
import styled, { keyframes } from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "tui-color-picker/dist/tui-color-picker.css";
import codeSyntax from "@toast-ui/editor-plugin-color-syntax";
import "highlight.js/styles/github.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { history } from "redux/configureStore";
import { actionCreators as TrilogActions } from "redux/modules/trilog";
import { useDispatch, useSelector } from "react-redux";
import { config } from "redux/modules/config";
import _ from "lodash";
import { BoardWriteMap } from "components/components";
import LoopIcon from "@material-ui/icons/Loop";

const BoardWrite = (props) => {
  const dispatch = useDispatch();
  const is_loading = useSelector(
    (state) => state.trilog.loading.detail_loading
  ); // 모든 contents가 로드가 됬나 여부
  const detail = useSelector((state) => state.trilog.detail); // 상세 게시글 정보 from Redux
  const id = props.match.params.id; // 상세 게시글 ID
  const is_edit = id ? true : false; // 수정페이지인지 작성페이지인지

  const data = React.useRef();

  const [title, setTitle] = React.useState(""); // 제목
  const [address, setAddress] = React.useState(
    "지도 마커를 클릭하시면 주소가 여기 표시됩니다."
  ); // 주소
  const [keyword, setKeyword] = React.useState("관악구청"); // 지도 검색 키워드
  const [imageUrls, setImageUrls] = React.useState([]); // 사용자가 작성 및 수정시 사용했던 모든 이미지들, 이후 서버에서 사용안한 이미지들 삭제
  const [imgLoading, setImgLoading] = React.useState(false); // 이미지 로딩 시

  const handleMap = _.debounce((val) => {
    setKeyword(val);
  }, 500);

  // 게시글 작성 및 수정
  const sendData = async () => {
    if (title === "") {
      alert("제목을 입력하세요.");
      return;
    }

    const content = data.current.getInstance().getMarkdown();

    if (content === "") {
      alert("내용을 입력하세요.");
      return;
    }

    let filter_imageUrls = imageUrls.filter((val) =>
      content.includes(val.imageFilePath)
    ); // 사용안한 이미지 링크들 제거

    if(is_edit) {
      if(detail.information.imageUrlList.length > 0) {
        const filter_images = detail.information.imageUrlList.filter((val) => content.includes(val.imageFilePath));
        filter_imageUrls = [...filter_images, ...filter_imageUrls];
      } 
    }

    console.log(filter_imageUrls, '최종 모든 이미지들');

    const post = {
      title: title,
      address: address,
      description: content,
      imageUrlList: filter_imageUrls,
      is_edit: is_edit,
      id: id,
    };

    dispatch(TrilogActions.addTrilog(post));
    setImageUrls([]);
  };

  // Toast UI Editor에서 사용자가 이미지 추가할때
  const uploadImage = async (blob) => {
    const file_size = blob.size / 1024 / 1024;

    if (file_size > 10) {
      // 이미지가 10MB보다 크다면
      alert("각 이미지 용량은 최대 10MB 입니다.");
      return "failed";
    }

    let api = "";

    if (is_edit) {
      api = `${config}/api/boards/image/${id}`;
    } else {
      api = `${config}/api/boards/image`;
    }

    const access_token = localStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("imageFile", blob);

    setImgLoading(true);
    const url = await fetch(api, {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .catch((error) => console.log(error, "uploadImage"));
    setImgLoading(false);

    if (url.status === undefined) {
      setImageUrls((prevState) => [
        ...prevState,
        { imageFilePath: url.results.imageFilePath },
      ]);
      return url.results.imageFilePath;
    } else {
      if (url.status === 401) {
        alert("로그인을 다시 해주세요!");
      } else {
        alert("서버에 문제가 있습니다.");
      }
      return "failed";
    }
  };

  React.useEffect(() => {
    if (is_edit) {
      dispatch(TrilogActions.getTrilogDetail(id));
      if (detail.information !== undefined) {
        setAddress(detail.information.address);
        setTitle(detail.information.title);
      }
      console.log(detail.information.imageUrlList, '이미 list ');
    }
  }, []);

  return (
    <WriteContainer>
      {is_loading && is_edit ? (
        <></>
      ) : (
        <>
          {imgLoading ? (
            <ImgLoading>
              <LoopIcon />
              <div>⚡조금만 기다려 주세요⚡</div>
            </ImgLoading>
          ) : (
            <></>
          )}
          <Title margin="0 0 1.25rem 0">
            {is_edit ? (
              <h2 style={{ textAlign: "center" }}>Trilog 수정</h2>
            ) : (
              <h2 style={{ textAlign: "center" }}>Trilog 작성</h2>
            )}
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
              initialEditType="wysiwyg"
              initialValue={is_edit ? detail.information.description : ""}
              plugins={[codeSyntax, codeSyntaxHighlight]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const upload = await uploadImage(blob);
                  if (upload !== "failed") {
                    callback(upload, "alt text");
                  }
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
  
  @media (max-width: 1270px) {
    width: 850px;
  }

  @media (max-width: 980px) {
    width: 700px;
  }

  @media (max-width: 768px) {
    width: 500px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const spin = keyframes`
  100% {
      transform: rotate(360deg);
  }
`;

const ImgLoading = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  width: 100%;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & svg {
    font-size: 7rem;
    fill: rgb(43, 97, 225, 0.8);
    animation: ${spin} 2s linear infinite;
  }
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

  @media (max-width: 768px) {
    width: 15rem;
  }

  @media (max-width: 600px) {
    width: 10rem;
  }
`;

const TitleInput = styled.input`
  width: 31.563rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 15rem;
  }
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
