import { Drawer } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 45px 0 35px;
  margin: 34px 86px;
  margin-right: 100px;

  @media screen and (max-width: 600px) {
      margin: 100px auto 70px;
      
    }
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 500;
  font-family: "Newsreader";
  color: #141e0c;
  letter-spacing: -1px;

  @media screen and (max-width: 600px) {
      width: 100%;
      font-size: 40px;
    }
`;

const Menus = styled.div`
  display: flex;
  gap: 56px;
  align-items: center;
`;

const TextMenu = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: "Libre Franklin";
  color: #141e0c;
  cursor: pointer;
`;

const SvgMenu = styled.img`
  width: 26px;
  height: 20px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
      position: absolute;
      right: 30px;
      top: 30px;
    }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  margin: 24px auto 34px;
  gap: 46px;
`;

const BannerImg = styled.img`
  object-fit: cover;
  width: 70%;
  margin: 45px auto 80px;
  /* border-radius: 50px; */
    @media screen and (max-width: 600px){
      width: 95%;

    }
`;

const Footer = styled.div`
    margin-left: 107px;
    display: flex;
    gap: 40px;
    margin-top: 50px;
    
    @media screen and (max-width: 600px) {
      margin: 60px auto;
      padding: 0 10px;
    }
`;

const FooterTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: #141E0C;
`;

const FooterDescription = styled.div`
  font-size: 17px;
  white-space: pre-wrap;
  font-weight: 400;
  line-height: 160%;
  @media screen and (max-width: 600px) {
      font-size: 14px;
    }
`;


const CustomDrawer = styled(Drawer)`
  .ant-drawer-title {
    
  }
  .ant-drawer-header {
    padding: 0;
    border-bottom: none;
  }
  .ant-drawer-close {
    display: none;
  }
`


const OpenHeader = styled.div`
display: flex;
  justify-content: space-between;
  padding: 45px 100px 35px;
  box-sizing: border-box;
  margin: 34px auto 36px;
  width: 100%;
  align-items: center;
  @media screen and (max-width: 600px) {

   flex-direction: row-reverse;
   max-width: 100vw;
   padding: 0 20px;
   
  }
`

const OpenLogo = styled.div`
  font-size: 32px;
  font-weight: 500;
  font-family: "Newsreader";
  color: #141e0c;
  letter-spacing: -1px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
   font-size: 25px; 
  }
`

const OpenSvgMenu = styled.img`
width: 26px;
height: 20px;
cursor: pointer;
@media screen and (max-width: 600px) {
 width: 17px;
 height: 17px; 
}
`


export default function Intro() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});
    const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <Logo>Perfume Dream</Logo>
        <Menus>
          {!isMobile && <TextMenu>Home</TextMenu>}
          {!isMobile && <TextMenu onClick={() => navigate("/citrus")}>Shop</TextMenu>}
          {!isMobile && <TextMenu onClick={() => navigate("/pick")}>Pick</TextMenu>}
          {!isMobile && <SvgMenu style={{ marginLeft: 30 }} src="/intro/bag.svg" onClick={() => navigate("/cart")}/>}
          {!isMobile && <SvgMenu src="/intro/user.svg" onClick={() => navigate("/user")}/>}
          {/* {!isMobile && <SvgMenu src="/intro/search.svg" onClick={() => navigate("/search")}/>} */}
          <SvgMenu src="/intro/menu.svg" onClick={() => setOpen(true)}/>
        </Menus>
      </Header>
      <BannerImg src="/intro/image 1.png" />
      {/* <Body>
        <BannerImg src="intro/banner1.png" />
        <BannerImg src="intro/banner2.png" />
        <BannerImg src="intro/banner3.png" />
      </Body> */}
      <Footer>
        {!isMobile && <FooterTitle>PERFUME DREAM</FooterTitle>}
        <FooterDescription>
          Manager : JungSooGong <br />
          Call : 070-1234-5678
          <br />
          Email : jungsogong@naver.com
          <br />
          Address : 서울특별시 성북구
          <br />
          Copyright ©perfumedream. All rights reserved.
        </FooterDescription>
      </Footer>

      <CustomDrawer
      placement={"right"}
        title={
          <OpenHeader>
            <OpenSvgMenu src="/close.svg" onClick={() => setOpen(false)} />
            <OpenLogo onClick={() => navigate("/")}>Perfume Dream</OpenLogo>
            <OpenSvgMenu src="/intro/bag.svg" onClick={() => navigate("/pick")} />
          </OpenHeader>
        }
        width={"100%"}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu />
      </CustomDrawer>
    </Wrapper>
  );
}
