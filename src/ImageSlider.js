import React, { useState } from "react";
import { TestData } from "./TestData";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import styled from "styled-components";

const ImageSlider = (props) => {
  const { slides } = props;
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);
  if (!Array.isArray(TestData) || TestData.length <= 0) {
    return null;
  }

  return (
    <Section>
      <LeftArrow>
        <FaArrowCircleLeft onClick={prevSlide} />
      </LeftArrow>
      <RightArrow>
        <FaArrowCircleRight onClick={nextSlide} />
      </RightArrow>
      {TestData.map((slide, index) => {
        if (index === current) {
          return (
            <SlideActive key={index}>
              {index === current && (
                <Image src={slide.image} alt="travel image" />
              )}
            </SlideActive>
          );
        } else {
          return (
            <Slide key={index}>
              )}
            </Slide>
          );
        }
      })}
    </Section>
  );
};

ImageSlider.defaultProps = {
  slides: { TestData },
};

const Slide = styled.div`
  opacity: 0;
  transition: opacity 1s;
`;

const SlideActive = styled.div`
  opacity: 1;
  transition: opacity 1;
`;

const Section = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  background: black;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  width: 1000px;
  height: 600px;
  border-radius: 10px;
`;

const RightArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const LeftArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

export default ImageSlider;
