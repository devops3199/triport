import React, { Fragment, useRef } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

const EditModal = (props) => {
  const { modal, onClose } = props;
  console.log(modal);
  const inputRef = useRef();

  const selectimage = () => {
    inputRef.current.click();
  };

  const innerwid = window.innerWidth;

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  return (
    <Container modal={modal} innerwid={innerwid}>
      <ContainerCropper>
        {image ? (
          <>
            <CropperDiv>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </CropperDiv>
            <SliderDiv>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </SliderDiv>
          </>
        ) : null}
      </ContainerCropper>

      <ContainerButtons>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <Button1
          onClick={() => setImage(null)}
          style={{ marginRight: "0.5rem" }}
        >
          파일 삭제
        </Button1>
        <Button1 onClick={selectimage} style={{ marginRight: "0.5rem" }}>
          파일 선택
        </Button1>
        <Button1 style={{ backgroundColor: "#ff607c" }} onClick={onClose}>
          업로드
        </Button1>
      </ContainerButtons>
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) => (props.modal ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-end;
  width: 32rem;
  height: 32rem;
  position: fixed;
  top: 20%;
  left: 35%;
  bottom: 0;
  right: 0;
  background-color: #f4f4ff;
  border: 1px solid #739cff;
  border-radius: 10px;
  z-index: 999;
`;

const ContainerCropper = styled.div`
  height: 70%;
  padding: 10px;
`;

const CropperDiv = styled.div`
  height: 90%;
  position: relative;
`;

const SliderDiv = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  margin: auto;
  width: 60%;
`;

const ContainerButtons = styled.div`
  width: 30rem;
  border: 1px solid #f5f5f5;
  height: 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Button1 = styled.button`
  font-size: 1rem;
  font-family: "TTTogether";
  width: 22.2rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #739cff;
  color: #ffffff;
`;

export default EditModal;
