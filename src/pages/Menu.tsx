import React from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
    font-family: "Hahmlet";
    overflow: hidden;
`;

const Container = styled.div`
  width: 1000px;
  margin: 50px auto;
  padding: 40px;
  border: 1px solid #ccc;
    height: 300px;
    @media screen and (max-width: 600px) {
      width: 90%;
      box-sizing: border-box;
      height: fit-content;
    }
`;

const Section = styled.div`
  display: flex;

  justify-content: center;
  gap: 100px;
  margin-bottom: 20px;
  @media screen and (max-width: 600px) {
      gap: 50px;
    }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 18px;

  margin-bottom: 10px;
  border-bottom: 1px solid #000;
  display: inline-block;
`;

const Item = styled.p`
  font-size: 16px;
  margin: 5px 0;
  text-align: left;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 600px) {
      text-align: center;
    }
`;

export default function Menu() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: "(max-width: 600px)"});

  return (
    <Wrapper>
      <Container>
      <Section>
        {!isMobile && <Column>
          <Title>Perfume Dream</Title>
          <Item onClick={() => navigate("/company")}>브랜드 소개</Item>
        </Column>}
        {/* {!isMobile && <Column>
          <Title>고객 서비스</Title>
          <Item>공지사항</Item>
          <Item>구매 후기</Item>
          <Item>FAQ</Item>
        </Column>} */}
        
        <Column>
          <Title>제품 구매</Title>
          <Item onClick={()=> navigate("/citrus")}>Citrus</Item>
          <Item onClick={()=> navigate("/musk")}>Musk</Item>
          <Item onClick={()=> navigate("/sweet")}>Sweet</Item>
          <Item onClick={()=> navigate("/soap")}>Soap</Item>
          <Item onClick={()=> navigate("/floral")}>Floral</Item>
          <Item onClick={()=> navigate("/woody")}>Woody</Item>

        </Column>
        <Column>
          <Title onClick={() => navigate("/user")}>마이페이지</Title>
          <Item onClick={() => navigate("/user")}>내 정보</Item>
          <Item onClick={() => navigate("/order")}>주문조회</Item>
          <Item onClick={() => navigate("/pick")}>관심상품</Item>
          <Item onClick={() => navigate("/cart")}>장바구니</Item>
        </Column>
      </Section>
    </Container>
    </Wrapper>
  );
}
