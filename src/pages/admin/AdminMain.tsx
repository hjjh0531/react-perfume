import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "../../components/MainHeader";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
`;

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  width: 100%;
  display: grid;
  border: 1px solid #8a8a8a;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 80px;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 90%;
    box-sizing: border-box;
    padding: 40px;
  }
`;

const Button = styled.div`
  cursor: pointer;
  border: 1px solid #8a8a8a;
  padding: 10px;
  display: flex;
  color: #8a8a8a;
  justify-content: space-between;
  align-items: center;
  img {
    width: 10px;
    height: 10px;
  }
`;

export default function AdminMain() {
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Button onClick={() => navigate("/admin/item/view")}>
          모든 상품 조회
          <img src="/arrowRight.svg" />
        </Button>
        <Button onClick={() => navigate("/admin/item/add")}>
          상품 등록
          <img src="/arrowRight.svg" />
        </Button>
        <Button onClick={() => navigate("/admin/order/view")}>
          {" "}
          특정 주문 상세 조회
          <img src="/arrowRight.svg" />
        </Button>
        <Button onClick={() => navigate("/admin/item/edit")}>
          상품 수정
          <img src="/arrowRight.svg" />
        </Button>
        {/* <Button>
          주문 상태 변경
          <img src="/arrowRight.svg" />
        </Button> */}
      </Container>
    </Wrapper>
  );
}
