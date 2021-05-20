import React from "react";
import "shared/scss/About.scss";
import styled from "styled-components";
import { Logo, Play, LikeFill } from "media/svg/Svg";
import Tripper from "media/image/about-tripper.jpg";
import TrilsImage1 from "media/image/about-trils.jpg";
import TrilsImage2 from "media/image/about-trils2.jpg";
import Profile2 from "media/image/about_profile2.jpg"
import Blog from "media/image/about_blog.jpg";
import Park from "media/image/park.png";
import Hoon from "media/image/hoon.png";
import Chan from "media/image/chan.jpg";
import Jin from "media/image/jin.png";
import Min from "media/image/min.png";
import Jisoo from "media/image/jisoo.png";
import Yoon from "media/image/yoon.png";

const About = () => {
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((e, o) => {
            e.forEach(entry => {
                if(entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-lazy');
                    img.setAttribute('src', src);
                    o.disconnect();
                }
            })
        });
        io.observe(target);
    };

    const parallax = (target) => {
        const io = new IntersectionObserver((e, o) => {
            e.forEach(entry => {
                if(entry.isIntersecting) {
                    const div = entry.target;
                    const arr = div.classList;

                    if(arr.contains('up')) {
                        div.classList.add('showUp');
                    } else if(arr.contains('left')) {
                        div.classList.add('showLeft');
                    } else {
                        div.classList.add('showRight');
                    }

                    o.disconnect();
                }
            })
        })
        io.observe(target);
    };

    React.useEffect(() => {
        const imgs = document.querySelectorAll('img');
        imgs.forEach(lazyLoad);

        const targets = document.querySelectorAll('.animate');
        targets.forEach(parallax);
    }, []);

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
                <TripperWrapper className="animate up">
                    <img data-lazy={Tripper} />
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
                                <div>짜릿했던 순간!</div>
                                <div>생생한 영상을 <span>Trils</span>에 올려주세요.</div>
                                <div>영상 속 여행이 궁금하다면, 💙를 눌러보세요!</div>
                                <div><span>Trilog</span>에 여행 이야기가 올라올지도 몰라요..!😄</div>
                            </Info>
                            <CardWrapper className="animate left">
                                <User>
                                    <img data-lazy={Profile2} />
                                    <span>Tripper</span>
                                </User>
                                <TrilsCard url={TrilsImage2}>
                                   <Play />
                                </TrilsCard>
                                <LikeWrapper>
                                    <LikeFill />
                                    <span>좋아요+13</span>
                                    <Tag>#제주도</Tag>
                                    <Tag>#힐링</Tag>
                                    <Tag>#떠나자</Tag>
                                </LikeWrapper>
                            </CardWrapper>
                        </LeftWrapper>
                        <RightWrapper>
                            <CardWrapper className="animate right">
                                <User>
                                    <img data-lazy={Profile2} />
                                    <span>Tripper</span>
                                </User>
                                <TrilsCard url={TrilsImage1}>
                                   <Play />
                                </TrilsCard>
                                <LikeWrapper>
                                    <LikeFill />
                                    <span>좋아요+7</span>
                                    <Tag>#강원도</Tag>
                                    <Tag>#캠핑</Tag>
                                    <Tag>#노을</Tag>
                                </LikeWrapper>
                            </CardWrapper>
                        </RightWrapper>
                    </DivideWrapper>
                </CenterWrapper>
            </TrilsWrapper>
            <TrilogWrapper>
                <CenterWrapper>
                    <TitleWrapper>
                        <span>Trilog</span>
                    </TitleWrapper>
                    <Info>
                        <div>짧은 영상으로 아쉬움이 남는다면?</div>
                        <div>Trilog를 통해 보다 자세한 정보들을 확인할 수 있어요!</div>
                        <div>Trilog에선 이미지와 긴 글을 이용해</div>
                        <div><span>'내가 다녀온 곳'</span> 에 대한 정보를 자세하게 업로드할 수 있습니다! 👏</div>
                    </Info>
                    <ImgWrapper className="animate up">
                        <img data-lazy={Blog} />
                    </ImgWrapper>
                </CenterWrapper>
            </TrilogWrapper>
            <MemberWrapper>
                <CenterWrapper>
                    <TitleWrapper>
                        <span>Triport 팀 소개</span>
                    </TitleWrapper>
                    <SectionWrapper>
                        <span>리더</span>
                    </SectionWrapper>
                    <div>
                        <MemberCard className="animate right">
                            <MemberImg data-lazy={Park} />
                            <MemberText>
                                <NameTag>
                                    <Name>박은진</Name><FeatureTag>로그인</FeatureTag><FeatureTag>회원가입</FeatureTag><FeatureTag>마이페이지</FeatureTag><FeatureTag>AWS</FeatureTag>
                                </NameTag>
                                <div>차근차근 생각을 실천하는 백엔드 개발자 박은진 입니다!😊 <br/>서비스의 기획, 코드 구성에 대한 고민을 하나씩 이루는 재미에 푹 빠진 요즘입니다.🥰<br/> 무엇이든 구현해낼 수 있다는 자신감과 긍정적인 마음으로 코딩과 밀당중! <br/>성장의 계기가된 팀에서, 좋은 팀원들과 특별한 이야기를 담은 TRIPORT✈️  많이 이용해주세요!<br/> Bug, VoC 등 피드백은 언제나 감사드립니다. 🙏🏻</div>
                                <div><BlueTag>github:</BlueTag> <a href="https://github.com/eungenie" target="_blank">https://github.com/eungenie</a></div>
                                <div><BlueTag>blog:</BlueTag> <a href="https://zins.tistory.com/" target="_blank">https://zins.tistory.com/</a></div>
                                <div><BlueTag>email:</BlueTag> eunzin.park@gmail.com</div>
                            </MemberText>
                        </MemberCard>
                        <MemberCard className="animate right">
                            <MemberImg data-lazy={Hoon} />
                            <MemberText>
                                <NameTag>
                                    <Name>김병훈</Name><FeatureTag>Trils</FeatureTag>
                                </NameTag>
                                <div>프론트엔드 개발자 김병훈입니다. 여행을 좋아하는 사람 중 하나로써 영상과 사진을 업로드하고 다른 사람들의 글도 보면서 그 다음 여행할 때 여행지를 참고하거나 눈으로 힐링할 수 있으면 좋을 것 같다는 취지로 이 프로젝트를 진행하게 되었습니다. 감사합니다.</div>
                                <div><BlueTag>github:</BlueTag> <a href="https://github.com/kbyunghoon" target="_blank">https://github.com/kbyunghoon</a></div>
                                <div><BlueTag>blog:</BlueTag> <a href="https://velog.io/@kbhoon" target="_blank">https://velog.io/@kbhoon</a></div>
                                <div><BlueTag>email:</BlueTag> kbhthl11@gmail.com</div>
                            </MemberText>
                        </MemberCard>
                    </div>
                    <SectionWrapper>
                        <span>프론트엔드</span>
                    </SectionWrapper>
                    <div>
                        <MemberCard className="animate left">
                            <MemberImg data-lazy={Chan} />
                            <MemberText>
                                <NameTag>
                                    <Name>정찬엽</Name><FeatureTag>Trilog</FeatureTag><FeatureTag>About</FeatureTag><FeatureTag>AWS</FeatureTag>
                                </NameTag>
                                <div>매일 성장하는 FE개발자, 정찬엽입니다!😄 즐거운 트릴하세요!</div>
                                <div><BlueTag>github:</BlueTag> <a href="https://github.com/rayrayj92" target="_blank">https://github.com/rayrayj92</a></div>
                                <div><BlueTag>blog:</BlueTag> <a href="https://kodepaper.tistory.com/" target="_blank">https://kodepaper.tistory.com/</a></div>
                                <div><BlueTag>email:</BlueTag> ops3199@outlook.kr</div>
                            </MemberText>
                        </MemberCard>
                        <MemberCard className="animate left">
                            <MemberImg data-lazy={Min} />
                            <MemberText>
                                <NameTag>
                                    <Name>박민경</Name><FeatureTag>로그인</FeatureTag><FeatureTag>회원가입</FeatureTag><FeatureTag>마이페이지</FeatureTag>
                                </NameTag>
                                <div>TRIPORT에 많은 애정을 꾹꾹 눌러담은 박민경입니다 :)<br/>그럼, Traveler 여러분! 모두 Happy TRIPORT~ ✈️🥰</div>
                                <div><BlueTag>github:</BlueTag> <a href="https://github.com/pmk2424" target="_blank">https://github.com/pmk2424</a></div>
                                <div><BlueTag>blog:</BlueTag> <a href="https://velog.io/@pmk4236" target="_blank">https://velog.io/@pmk4236</a></div>
                                <div><BlueTag>email:</BlueTag> pmk42360@gmail.com</div>
                            </MemberText>
                        </MemberCard>
                    </div>
                    <SectionWrapper>
                        <span>백엔드</span>
                    </SectionWrapper>
                    <div>
                        <MemberCard className="animate right">
                            <MemberImg data-lazy={Yoon} />
                            <MemberText>
                                <NameTag>
                                    <Name>손윤환</Name><FeatureTag>Trils</FeatureTag><FeatureTag>AWS</FeatureTag>
                                </NameTag>
                                <div>자유롭게 여행하듯 삶을 살고 싶은 손윤환이라고 합니다😘<br/>제 개발자 여행이 여러분께 잠시나마 즐거움을 선물할 수 있었으면 좋겠습니다😁</div>
                                <div><BlueTag>github:</BlueTag> <a href="https://github.com/beadoer1" target="_blank">https://github.com/beadoer1</a></div>
                                <div><BlueTag>blog:</BlueTag> <a href="https://beadoer1.github.io/" target="_blank">https://beadoer1.github.io/</a></div>
                                <div><BlueTag>email:</BlueTag> beadoer1@gmail.com</div>
                            </MemberText>
                        </MemberCard>
                        <MemberCard className="animate right">
                            <MemberImg data-lazy={Jin} />
                            <MemberText>
                                <NameTag>
                                    <Name>채진욱</Name><FeatureTag>Trilog</FeatureTag><FeatureTag>마이페이지</FeatureTag><FeatureTag>AWS</FeatureTag>
                                </NameTag>
                                <div>😄 하루하루 개발의 즐거움을 알아가고 있는 채진욱이라고 합니다. <br/>Triport를 통해 여행이 쉽지 않은 시국이지만 서로의 경험을 공유하면서 대리만족을 할 수 있으셨으면 좋겠습니다! 🎉</div>
                                <div><BlueTag>github:</BlueTag> <a href="https://github.com/cowlsdnr77" target="_blank">https://github.com/cowlsdnr77</a></div>
                                <div><BlueTag>blog:</BlueTag> <a href="https://velog.io/@cowlsdnr77" target="_blank">https://velog.io/@cowlsdnr77</a></div>
                                <div><BlueTag>email:</BlueTag> cowlsdnr77@naver.com</div>
                            </MemberText>
                        </MemberCard>
                    </div>
                    <SectionWrapper>
                        <span>디자인</span>
                    </SectionWrapper>
                    <div>
                        <MemberCard className="animate right">
                            <MemberImg data-lazy={Jisoo} />
                            <MemberText>
                                <NameTag>
                                    <Name>안지수</Name><FeatureTag>갓지수님</FeatureTag>
                                </NameTag>
                                <div><BlueTag>portfolio:</BlueTag> <a href="https://jisooahn3582.wixsite.com/my-site" target="_blank">https://jisooahn3582.wixsite.com/my-site</a></div>
                                <div><BlueTag>email:</BlueTag> js3582@naver.com</div>
                            </MemberText>
                        </MemberCard>
                    </div>
                </CenterWrapper>
            </MemberWrapper>
        </AboutContainer>
    );
};

const AboutContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const IntroWrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 100px;
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
        font-size: 30px; 
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
    margin: 30px 0 55px 0;

    & div {
        margin: 1.2rem 0;
    }

    & span {
        font-family: paybooc-bold;
        color: #2B61E1;
    }
`;

const CardWrapper = styled.div`
    position: relative;
`;

const User = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: white;
    text-shadow: -1px 0 black,0 1px black,1px 0 black,0 -1px black;
    display: flex;
    align-items: center;

    & img {
        border-radius: 50%;
        width: 35px;
        margin-right: .5rem;
    }
`;

const TrilsCard = styled.div`
    width: 400px;
    height: 700px;
    background: url(${(props) => props.url}) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    
    & svg {
        width: 120px;
    }
`;

const LikeWrapper = styled.div`
    display: flex;
    align-items: center;

    & svg {
        width: 50px;
    }

    & span {
        margin: 0 .5rem;
    }
`;

const Tag = styled.span`
    font-family: paybooc-bold;
    color: #2B61E1;
`;

const RightWrapper = styled.div`
    width: 50%;
    height: 100%;
    margin-top: 30px;
`;

const TrilogWrapper = styled.div`
    width: 100%;
    height: 1200px;
`;

const ImgWrapper = styled.div`
    margin-top: 50px;

    & img {
        width: 900px;
    }
`;

const MemberWrapper = styled.div`
    width: 100%;
    min-height: 2700px;
`;

const SectionWrapper = styled.div`
    width: 100%;
    margin: 50px 0;

    & span {
        font-family: paybooc-bold;
        font-size: 18px; 
        color: #2B61E1;
    }
`;

const MemberCard = styled.div`
    width: 900px;
    height: 280px;
    box-shadow: 0px 3px 6px #2B61E143;
    border-radius: 10px;
    margin: 30px 0;
    display: flex;
    align-items: center;
`;

const MemberImg = styled.img`
    width: 130px;
    height: 130px;
    margin: 30px;
`;

const MemberText = styled.div`
    width: 600px;

    & div {
        margin: .5rem 0;
    }
`;

const NameTag = styled.div`
    display: flex;
    align-items: center;
`;

const Name = styled.span`
    font-family: paybooc-bold;
    font-size: 20px;
    color: #5a5a5a;
`;

const FeatureTag = styled.span`
    font-family: paybooc-Light;
    font-size: .75rem;
    padding: .25rem .75rem;
    margin: 0 .25rem;
    border: 1px solid #2B61E1;
    border-radius: 10px;
    background-color: #2B61E1;
    color: #fff;
`;

const BlueTag = styled.span`
    color: #2B61E1;
`;

export default About;