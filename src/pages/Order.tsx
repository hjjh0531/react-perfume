import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
`;

const Container = styled.div`
  width: 1200px;
  margin: 50px auto;
  margin-top: 0;
  padding: 20px;

  @media screen and (max-width: 600px){
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.div`
  padding: 10px;
  text-align: left;
  font-size: 14px;
  text-align: center;
  color: #aaa;
  width: 20%;
`;

const TableCell = styled.td`
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-align: left;
  font-size: 14px;
  color: #333;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
`;

const EmptyRow = styled.tr`
  height: 100px;
`;

const NoneNotice = styled.div`
  color: #aaa;
  padding-bottom: 20px;
`;

const OrderImg = styled.img`
  width: 70px;
  margin: auto;
`;
export default function Order() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});

  const [orders, setOrders] = useState<any[]>([]);

  const getMyOrder = async () => {
    try {
      const res = await axios.get("http://localhost:8080/order/my", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
        },
      });
      console.log(res);
      setOrders(res.data);
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    }
  };

  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    getMyOrder();
  }, []);
  return (
    <Wrapper>
      <MainHeader />
      <OrderImg src="/order.png" />
      <Container>
        <Title>주문 상품 정보</Title>

        <div style={{ border: "1px solid #dfdfdf" }}>
          <TableRow>
            <TableHeader>
              주문일자
              <br />
              [주문번호]
            </TableHeader>

            <TableHeader>상품정보</TableHeader>
            <TableHeader>수량</TableHeader>
            <TableHeader>상품구매금액</TableHeader>
            <TableHeader>주문처리상태</TableHeader>
          </TableRow>

          {/* <tbody>
            <EmptyRow>
              
            </EmptyRow>
          </tbody> */}

          {orders && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {orders.map((data: any) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      borderBottom: "1px solid #dfdfdf",
                      padding: "15px 0",
                    }}
                  >
                    <div style={{ width: "20%" }}>{data.orderId}</div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "40%",
                        gap: 20,
                      }}
                    >
                      {data.items.map((item: any) => {
                        return (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              {item.productName}
                            </div>
                            <div style={{ width: "100%" }}>{item.quantity}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ width: "20%" }}>
                      {numberWithCommas(data.totalAmount * 1000)} {!isMobile && "won"}
                    </div>
                    <div style={{ width: "20%" }}>{data.orderState}</div>
                  </div>
                );
              })}
            </div>
          )}
          {!orders && (
            <NoneNotice style={{ textAlign: "center", color: "#aaa" }}>
              주문 내역이 없습니다.
            </NoneNotice>
          )}
        </div>
      </Container>
    </Wrapper>
  );
}
