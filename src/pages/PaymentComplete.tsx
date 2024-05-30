import React from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
  height: 100vh;
`;

const Container = styled.div`
  width: 80%;
  background-image: url("/rect.png");
  margin: 80px auto;

  height: 60vh;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 36px;
  margin-bottom: 50px;
  color: #fff;
`;

const Inner = styled.div`
  background: #fff;
  width: 60%;
  display: flex;
  height: 50%;
`;

const Table = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  margin: auto;
  width: 80%;
`;
const Row = styled.div`
  width: 100%;  
  margin: 20px auto;
  font-size: 20px;
  display: flex;
`;
const Cell = styled.div`
  width: 40%;
`;

const TitleCell = styled(Cell)`
  color: #484848;
`;
export default function PaymentComplete() {
  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Title>주문이 완료되었습니다</Title>
        <Inner>
          <Table>
            <Row>
              <TitleCell>주문번호</TitleCell>
              <Cell>20240531-855561</Cell>
            </Row>
            <Row>
              <TitleCell>주문자</TitleCell>
              <Cell>정소공</Cell>
            </Row>
            <Row>
              <TitleCell>배송지</TitleCell>
              <Cell style={{width: "60%"}}>
                인천광역시 부평구 부평북로 463, 주공미래타운3단지 302-1104
              </Cell>
            </Row>
          </Table>
        </Inner>
      </Container>
    </Wrapper>
  );
}
