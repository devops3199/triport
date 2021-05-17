import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo, Play } from "media/svg/Svg";
import Tripper from "media/image/about-tripper.jpg";
import TrilsImage1 from "media/image/about-trils.jpg";
import TrilsImage2 from "media/image/about-trils2.jpg";

const About = () => {
    return(
        <AboutContainer>
            <IntroWrapper>
                <LogoWrapper>
                    <Logo />
                    <span>란?</span>   
                </LogoWrapper>
                <Description>
                    <div>무작정 어디론가 떠나 힐링을 하고싶은데, 어디로 가야할지 모를 때,</div>
                    <div>또는 여행을 좋아하는, 여행을 가고싶은, Traveler!</div>
                    <div>바로 여러분들을 위한 공간, <span>Triport</span>입니다.</div>
                </Description>
                <TripperWrapper>
                    <img src={Tripper} />
                </TripperWrapper>
            </IntroWrapper>
            <TrilsWrapper>
                <CenterWrapper>
                    <TitleWrapper>
                        <span>Trils</span>
                    </TitleWrapper>
                    <DivideWrapper>
                        <LeftWrapper>
                            <Info>
                                <div>여행지에 대한 영상을 한번에 볼 수 있어요!</div>
                                <div>짧은 영상을  <span>Trils</span>에 올려,</div>
                                <div>여러분이 다녀온 곳을 자랑해주세요! 😄</div>
                            </Info>
                            <TrilsCard url={TrilsImage2}>

                            </TrilsCard>
                        </LeftWrapper>
                        <RightWrapper>
                            <TrilsCard url={TrilsImage1}>

                            </TrilsCard>
                        </RightWrapper>
                    </DivideWrapper>
                </CenterWrapper>
            </TrilsWrapper>
            <TrilogWrapper>

            </TrilogWrapper>
            <MemberWrapper>

            </MemberWrapper>
        </AboutContainer>
    );
};

const FadeInUp = keyframes`
  0% {
    transform : translateX(100%);
  }
  100% {
    transform : translateX(0%);
  }
`;

const AboutContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const IntroWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
`;

const LogoWrapper = styled.div`
    width: 100%;
    font-family: paybooc-Bold;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: end;

    & svg {
        width: 268px;
    }

    & span {
        margin-left: 12px;
    }
`;

const Description = styled.div`
    width: 100%;
    font-family: paybooc-Light;
    font-size: 20px;
    margin-top: 50px;

    & div {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 1.2rem 0;
    }

    & span {
        font-family: paybooc-bold;
        color: #2B61E1;
    }
`;

const TripperWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 50px 0 100px 0;

    & img {
        animation: ${FadeInUp} 1.2s ease-out;
        width: 500px;
    }
`;

const TrilsWrapper = styled.div`
    width: 100%;
    height: 1200px;
    background-color: #F2F6FF;
`;

const CenterWrapper = styled.div`
    width: 900px;
    height: 1200px;
    margin: 0 auto;
`;

const TitleWrapper = styled.div`
    width: 100%;
    margin-top: 70px;
    
    & span {
        font-family: paybooc-bold;
        font-size 30px; 
        color: #2B61E1;
    }
`;

const DivideWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const LeftWrapper = styled.div`
    width: 50%;
    height: 100%;
`;

const Info = styled.div`
    font-family: paybooc-Light;
    font-size: 20px;
    margin-top: 30px;

    & div {
        margin: 1.2rem 0;
    }

    & span {
        font-family: paybooc-bold;
        color: #2B61E1;
    }
`;

const TrilsCard = styled.div`
    width: 400px;
    height: 700px;
    background: url(${(props) => props.url}) no-repeat;
    background-size: cover;
`;

const RightWrapper = styled.div`
    width: 50%;
    height: 100%;
`;

const TrilogWrapper = styled.div`
    width: 100%;
`;

const MemberWrapper = styled.div`
    width: 100%;
`;

export default About;