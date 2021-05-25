import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Logo } from "media/svg/Svg";

import grade1 from "media/svg/등급1.svg";
import grade2 from "media/svg/등급2.svg";
import grade3 from "media/svg/등급3.svg";
import ximage from "media/image/X.png";

import Category from "components/Category";
import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const clickRef = useRef();

  const handleMenu = () => {
    if (clickRef.current.style.display === "none") {
      clickRef.current.style.display = "block";
    } else {
      clickRef.current.style.display = "none";
    }
  };

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  const gradeImg = () => {
    if (user.memberGrade === "TRAVELER") {
      return grade1;
    }
    if (user.memberGrade === "TRAVEL_EDITOR") {
      return grade2;
    }
    if (user.memberGrade === "TRAVEL_MASTER") {
      return grade3;
    }
  };

  // 카카오 로그아웃
  const KAKAO_LOGOUT_URL =
    "https://kauth.kakao.com/oauth/logout?client_id=b30e166ade03d146889e1b012679fcf6&logout_redirect_uri=https://triport.kr/auth/logout";
  //"https://kauth.kakao.com/oauth/logout?client_id=b30e166ade03d146889e1b012679fcf6&logout_redirect_uri=http://localhost:3000/auth/logout";

  if (user.is_login === true) {
    return (
      <React.Fragment>
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: "50",
            backgroundColor: "#fff",
          }}
        >
          {/* 모바일 버전 햄버거메뉴 상세페이지 */}
          <MobileDiv ref={clickRef}>
            <div style={{ backgroundColor: "#FFF", zIndex: "9999" }}>
              <MenuWrap>
                <RowWrap>
                  <div onClick={handleMenu}>
                    <CancleButton />
                  </div>

                  <LogoWrapper2>
                    <Logo />
                  </LogoWrapper2>
                </RowWrap>
                <MenuLine />
                <MobileName>{profile.nickname}</MobileName>
                <Category1
                  onClick={() => {
                    history.push("/");
                    clickRef.current.style.display = "none";
                  }}
                >
                  Trils
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("trilog");
                    clickRef.current.style.display = "none";
                  }}
                >
                  Trilog
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("/about");
                    clickRef.current.style.display = "none";
                  }}
                >
                  About
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("/profile");
                    clickRef.current.style.display = "none";
                  }}
                >
                  마이페이지
                </Category1>
                <Br />
                <Category1 href={KAKAO_LOGOUT_URL}>로그아웃</Category1>
                <Br />
              </MenuWrap>
            </div>
          </MobileDiv>

          {/* 모바일 버전 */}
          <Wrap>
            <Mobile>
              <MenuButton onClick={handleMenu}>
                <Bar></Bar>
                <Bar></Bar>
                <Bar></Bar>
              </MenuButton>
            </Mobile>
            <LogoWrapper
              onClick={() => {
                const pathname = history.location.pathname;
                if (pathname === `/`) {
                  history.replace(`/`);
                } else {
                  history.push(`/`);
                }
              }}
            >
              <Logo />
            </LogoWrapper>
            <Mobile>
              <Image
                onClick={() => {
                  history.push("/profile");
                }}
                url={profile.user_img}
              />
            </Mobile>

            {/* 데스크탑 버전 */}
            <LeftWrap>
              <Category history={history} />
            </LeftWrap>
            <RightWrap>
              <Image
                onClick={() => {
                  history.push("/profile");
                }}
                url={profile.user_img}
              />
              {/* <Grade url={gradeImg} /> */}
              <Nickname>{profile.nickname}</Nickname>

              <MyOrLogin
                onClick={() => {
                  const pathname = history.location.pathname;

                  if (pathname === "/profile") {
                  } else {
                    history.push("/profile");
                  }
                }}
              >
                마이페이지
              </MyOrLogin>

              {/* 카카오 로그아웃 URL로 이동 -> OAuth2LogoutHandler(카카오 로그아웃, 일반 로그아웃 둘 다 적용) 컴포넌트 로드 */}
              <LogoutOrSignUp href={KAKAO_LOGOUT_URL}>로그아웃</LogoutOrSignUp>
            </RightWrap>
          </Wrap>
          <Line />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: "50",
            backgroundColor: "#fff",
          }}
        >
          {/* 모바일 버전 햄버거메뉴 상세페이지 */}
          <MobileDiv ref={clickRef}>
            <div style={{ backgroundColor: "#FFF", zIndex: "9999" }}>
              <MenuWrap>
                <RowWrap>
                  <div onClick={handleMenu}>
                    <CancleButton />
                  </div>

                  <LogoWrapper2>
                    <Logo />
                  </LogoWrapper2>
                </RowWrap>
                <MenuLine />

                <Category1
                  onClick={() => {
                    history.push("/");
                    clickRef.current.style.display = "none";
                  }}
                >
                  Trils
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("/trilog");
                    clickRef.current.style.display = "none";
                  }}
                >
                  Trilog
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("/about");
                    clickRef.current.style.display = "none";
                  }}
                >
                  About
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("/login");
                    clickRef.current.style.display = "none";
                  }}
                >
                  로그인
                </Category1>
                <Br />
                <Category1
                  onClick={() => {
                    history.push("/signup");
                    clickRef.current.style.display = "none";
                  }}
                >
                  회원가입
                </Category1>
                <Br />
              </MenuWrap>
            </div>
          </MobileDiv>

          {/* 모바일 버전 */}
          <Wrap>
            <Mobile>
              <MenuButton onClick={handleMenu}>
                <Bar></Bar>
                <Bar></Bar>
                <Bar></Bar>
              </MenuButton>
            </Mobile>
            <LogoWrapper
              onClick={() => {
                const pathname = history.location.pathname;
                if (pathname === "/") {
                  window.location.reload();
                } else {
                  history.push("/");
                }
              }}
            >
              <Logo />
            </LogoWrapper>
            <Mobile>
              <MyOrLogin
                style={{ marginTop: "0.5rem" }}
                onClick={() => {
                  const pathname = history.location.pathname;
                  if (pathname === "/login") {
                    window.location.reload();
                  } else {
                    history.push("/login");
                  }
                }}
              >
                로그인
              </MyOrLogin>
            </Mobile>

            {/* 데스크탑 버전 */}

            <LeftWrap>
              <Category history={history} />
            </LeftWrap>
            <RightWrap>
              <MyOrLogin
                onClick={() => {
                  const pathname = history.location.pathname;
                  if (pathname === "/login") {
                    window.location.reload();
                  } else {
                    history.push("/login");
                  }
                }}
              >
                로그인
              </MyOrLogin>
              <LogoutOrSignUp
                onClick={() => {
                  const pathname = history.location.pathname;
                  if (pathname === "/signup") {
                    window.location.reload();
                  } else {
                    history.push("/signup");
                  }
                }}
              >
                회원가입
              </LogoutOrSignUp>
            </RightWrap>
          </Wrap>
          <Line />
        </div>
      </React.Fragment>
    );
  }
};

Header.defaultProps = {
  ok: false,
  nickname: "닉네임예시",
};

export default Header;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  margin: 0px;
  height: 5rem;
  background-color: #ffffff;
  background-size: cover;
  align-items: center;
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "paybooc-Bold";
  width: 50% auto;
  margin: 0px auto;
  margin-left: 5rem;

  @media (max-width: 980px) {
    margin-left: 3rem;
  }
  @media (max-width: 768px) {
    margin-left: 2rem;
  }

  @media (max-width: 600px) {
    margin-left: 1rem;
  }
  @media (max-width: 540px) {
    display: none;
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 30% auto;
  align-items: center;
  @media (max-width: 540px) {
    display: none;
  }
`;

const Line = styled.div`
  width: 100vw;
  height: 5px;
  background: #89acff;
  opacity: 1;
  margin-bottom: 5rem;
`;

const LogoWrapper = styled.div`
  margin-left: 2rem;
  cursor: pointer;
  & svg {
    width: 12rem;
  }
  @media (max-width: 980px) {
    margin-left: 0.5rem;
    & svg {
      width: 8rem;
    }
  }
  @media (max-width: 768px) {
    margin-left: 0.5rem;
    & svg {
      width: 8rem;
    }
  }
  @media (max-width: 600px) {
    margin-left: 0.5rem;
    & svg {
      width: 7rem;
    }
  }
  @media (max-width: 540px) {
    margin-left: 0.5rem;
    & svg {
      width: 8rem;
      margin-top: 0.5rem;
    }
  }
`;

const MyOrLogin = styled.button`
  cursor: pointer;
  background-color: #2b61e1;
  color: #ffffff;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: 0.3rem;
  margin-left: 2rem;
  margin-right: 1.5rem;
  width: 5rem;
  height: 1.7rem;

  @media (max-width: 980px) {
    font-size: 0.5rem;
    margin-left: 0.1rem;
    margin-right: 0.5rem;
    width: 3.5rem;
  }
  @media (max-width: 768px) {
    font-size: 0.5rem;
    margin-left: 0.1rem;
    margin-right: 0.5rem;
    width: 3.5rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
    margin-left: 0.8rem;
    margin-right: 0.5rem;
    width: 3.5rem;
  }
  @media (max-width: 540px) {
    font-size: 0.6rem;
    margin-left: 0.8rem;
    margin-right: 0.5rem;
    width: 3.5rem;
  }
`;

const LogoutOrSignUp = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  padding: 0.3rem;
  width: 4.5rem;
  height: 1rem;
  margin-right: 2rem;
  padding-bottom: 0.4rem;
  font-size: 0.9rem;
  text-decoration: none;
  &:visited {
    color: #5a5a5a;
  }
  @media (max-width: 980px) {
    font-size: 0.5rem;
    width: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 0.5rem;
    width: 3rem;
  }

  @media (max-width: 600px) {
    font-size: 0.5rem;
    width: 3rem;
    margin-right: 0.5rem;
  }
  @media (max-width: 540px) {
    font-size: 0.5rem;
    width: 3rem;
    margin-right: 0rem;
  }
`;

const Nickname = styled.div`
  width: 5rem;
  margin-right: 2rem;
  margin-top: -0.3rem;
  font-size: 1rem;
  font-weight: 800;
  @media (max-width: 768px) {
    margin-top: 0.1rem;
    margin-right: 0;
    font-size: 0.8rem;
    width: 4rem;
  }

  @media (max-width: 600px) {
    font-size: 0.5rem;
    width: 3rem;
  }
  @media (max-width: 540px) {
    font-size: 0.7rem;
    width: 3.5rem;
  }
`;

const Image = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 1px solid #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  background-position: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  margin-right: 0.5rem;

  @media (max-width: 1270px) {
    width: 2rem;
    height: 2rem;
  }
  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
  @media (max-width: 540px) {
    margin: 0px auto;
    margin-top: 0.3rem;
  }
`;

const Grade = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-position: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  margin: 0px auto;
  margin-top: -0.3rem;
  margin-right: 0.2rem;
`;

// 모바일용 반응형

const Mobile = styled.div`
  display: none;
  @media (max-width: 540px) {
    width: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MenuButton = styled.div`
  display: none;
  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
    width: 3rem;
    height: auto;
    margin: 0px auto;
    margin-top: 0.8rem;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  margin: 0px;
  margin-bottom: 7px;
  background-color: #2b61e1;
  border-radius: 5px;
`;

const MobileDiv = styled.div`
  position: absolute;
  display: none;
  height: 100%;
  background-color: #fff;
  z-index: 50;
`;

const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
  z-index: 999;
`;

const RowWrap = styled.div`
  @media (max-width: 540px) {
    display: flex;
    flex-direction: row;
    width: auto;
    height: 5rem;
  }
`;

const CancleButton = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${ximage});
  background-size: cover;
  margin-top: 1.5rem;
  margin-left: 1rem;
`;

const LogoWrapper2 = styled.div`
  margin-top: 2rem;
  margin-left: 10rem;
  cursor: pointer;
  & svg {
    width: 8rem;
  }
`;

const MobileName = styled.div`
  font-family: "paybooc-Bold";

  padding: 1rem;
`;

const Category1 = styled.a`
  cursor: pointer;
  color: #2b61e1;
  padding: 1rem;
  text-decoration: none;
`;

const Br = styled.div`
  width: 100%;
  height: 1px;
  background-color: #89acff;
`;

const MenuLine = styled.div`
  width: 100vw;
  height: 5px;
  background: #89acff;
  opacity: 1;
`;
