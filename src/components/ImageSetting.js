import React, { Fragment, useRef } from "react";
import Button from "@material-ui/core/Button";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
// import { generateDownload } from "./Test";

const ImageSetting = () => {
  const inputRef = useRef();

  const selectimage = () => {
    inputRef.current.click();
  };

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

  const test = () => {
    // generateDownload(image, croppedArea);
  };

  return (
    <Container>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setImage(null)}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={selectimage}
          style={{ marginRight: "10px" }}
        >
          Choose
        </Button>
        <Button variant="contained" color="secondary" onClick={test}>
          Download
        </Button>
        <Button variant="contained" color="secondary">
          Upload
        </Button>
      </ContainerButtons>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const ContainerCropper = styled.div`
  height: 90%;
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
  border: 1px solid #f5f5f5;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ImageSetting;
