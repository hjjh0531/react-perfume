import React from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

const Container = styled.div`
  background-image: url("/intro_background.png");
  width: 80%;
  box-sizing: border-box;
  height: 60vh;
  background-repeat: no-repeat;
  object-fit: cover;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 80px;
  @media screen and (max-width: 600px) {
    height: 80vh;
    padding: 40px;
    width: 90%;
  }
`;

const Title = styled.div`
  
  font-size: 40px;
  font-family: "NewsReader";
  color: #141e0c;
    white-space: pre-wrap;
    color: #5c5c5c;
    font-weight: 550;
    width: fit-content;

    position: relative;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 1px;
        background: #a1a1a1;
    }
    @media screen and (max-width: 600px) {
    font-size: 32px;
  }
`;

const Content = styled.div`
    line-height: 40px;
    color: #828282;
    @media screen and (max-width: 600px) {
   font-size: 14px;
  }
`;
export default function CompanyInfo() {
  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Title>Perfume Dream</Title>
        <Content>
          퍼퓸드림(Perfume Dream)은 향수(Perfume)과 꿈(Dream)이라는 두 단어의 <br/>
          합성어입니다. 꿈은 편안함과 신비로움을 상징합니다. 향수와 꿈, 이 두<br/>
          가지 요소를 조합하여 고객들에게 놀라울 정도의 딱 맞는 향수를<br/>
          찾아드리는 즐거운 경험을 제공하고자 합니다.<br/>
        </Content>
      </Container>
    </Wrapper>
  );
}
