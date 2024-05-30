import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Drawer } from "antd";
import Menu from "../pages/Menu";
import { useMediaQuery } from "react-responsive";

const Header = styled.div`
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
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 500;
  font-family: "Newsreader";
  color: #141e0c;
  letter-spacing: -1px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    font-size: 25px;
  }
`;

const SvgMenu = styled.img`
  width: 26px;
  height: 20px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 17px;
    height: 17px;
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
`;

type MainHeaderProps = {
  direction?: "left" | "right";
};

export default function MainHeader({ direction }: MainHeaderProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const navigate = useNavigate();
  return (
    <Header>
      <SvgMenu src="/intro/menu.svg" onClick={() => setOpen(true)} />
      <Logo onClick={() => navigate("/")}>Perfume Dream</Logo>
      <SvgMenu src="/intro/bag.svg" onClick={() => navigate("/cart")} />

      <CustomDrawer
        placement={isMobile ? "right" : direction ? direction : "left"}
        title={
          <Header>
            <SvgMenu src="/close.svg" onClick={() => setOpen(false)} />
            <Logo onClick={() => navigate("/")}>Perfume Dream</Logo>
            <SvgMenu src="/intro/bag.svg" onClick={() => navigate("/cart")} />
          </Header>
        }
        width={"100%"}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu />
      </CustomDrawer>
    </Header>
  );
}
