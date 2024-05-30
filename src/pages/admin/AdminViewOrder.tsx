import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../../components/MainHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
`;

const TableWrapper = styled.div`
  margin: 20px;
  overflow-x: auto;
  padding: 0 100px;
  position: relative;
  @media screen and (max-width: 600px) {
    padding: 0 10px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
`;


const PrevButton = styled.div`  
  display: flex;
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
  width: fit-content;
  margin-bottom: 10px;
  top: -30px;
  padding: 8px 20px;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  img { 
    transform: rotate(-180deg);
    width: 10px;
    height: 10px;
  }
`


export default function AdminViewOrder() {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  const getOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/view/orders/1/1000`,
        {
          withCredentials: true,
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
          },
        }
      );
      setOrders(res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Wrapper>
      <MainHeader />
      <TableWrapper>
      <PrevButton onClick={()=> navigate(-1)}>
          <img src="/arrowRight.svg"/>
          돌아가기</PrevButton>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Order ID</StyledTh>
              <StyledTh>Order Date</StyledTh>
              <StyledTh>Order State</StyledTh>
              <StyledTh>Total Amount</StyledTh>
              <StyledTh>Receiver Name</StyledTh>
              <StyledTh>Receiver Phone</StyledTh>
              <StyledTh>Shipping Address</StyledTh>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <StyledTr
                key={order.orderId}
                onClick={() =>
                  navigate("/admin/order/view/detail", {
                    state: {
                      orderId: order.orderId,
                    },
                  })
                }
              >
                <StyledTd>{order.orderId}</StyledTd>
                <StyledTd>
                  {new Date(order.orderDate).toLocaleString()}
                </StyledTd>
                <StyledTd>{order.orderState}</StyledTd>
                <StyledTd>
                  {(order.totalAmount * 1000).toLocaleString()} won
                </StyledTd>
                <StyledTd>{order.receiverName}</StyledTd>
                <StyledTd>{order.receiverPhone}</StyledTd>
                <StyledTd>{order.shippingAddress}</StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Wrapper>
  );
}
