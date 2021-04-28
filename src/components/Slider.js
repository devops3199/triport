import React, { useState } from "react";
import styled from "styled-components";
import SliderContent from "./SliderContent";
import { ReactComponent as LeftArrow } from "../media/svg/이전이미지.svg";
import { ReactComponent as RightArrow } from "../media/svg/다음이미지.svg";
import Dots from "./Dots"

const images = [
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
  "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
  "https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png",
];

const Slider = (props) => {
  const getWidth = () => 400;
  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex === images.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
    });
  };


  console.log(activeIndex)
  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * getWidth(),
        activeIndex: images.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth(),
    });
  };

  console.log()

  return (
    <SliderCSS>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * images.length}
      >
        {images.map((slide,i) => (
          <Slide content={slide} />
        ))}
      </SliderContent>
      <Arrow direction="left" onClick={prevSlide}>
        <LeftArrow />
      </Arrow>
      <Arrow direction="right" onClick={nextSlide}>
        <RightArrow />
      </Arrow>
      <Dots slides={images} activeIndex={activeIndex}/>
    </SliderCSS>
  );
};

const Arrow = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === "right" ? `right: 25px` : `left: 25px`)};
  height: 50px;
  width: 50px;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transform:scale(1.5);
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(2);
  }
  img {
    transform: translateX(
      ${(props) => (props.direction === "left" ? "-2" : "2")}px
    );
    &:focus {
      outline: 0;
    }
  }
`;

const SliderCSS = styled.div`
  position: relative;
  height: 100%;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  background: black;
  background-image: url("${(props) => props.content}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Slider;
