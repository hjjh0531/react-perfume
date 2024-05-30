import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../components/MainHeader";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
`;

const CardWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  display: flex;
  padding: 100px;
  justify-content: center;
  gap: 30px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
`;

const Detail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555;
`;

const TableWrapper = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  padding: 0 100px;
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
  /* &:hover {
    background-color: #efefef;
  } */
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;

  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;

  cursor: pointer;

  width: fit-content;
  margin: 20px auto;
  font-weight: 600;
  font-family: "Poppins";
  &:hover {
    background-color: #777;
  }
`;

const PrevButton = styled.div`  
  display: flex;
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
  width: fit-content; 
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

export default function AdminDetailOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    orderId: 0,
    orderState: "",
    totalAmount: 0,
    receiverName: "",
    receiverPhone: "",
    items: [],
  });

  const [selectedState, setSelectedState] = useState<any>();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});

  const handleStateChange = (event: any) => {
    setSelectedState(event.target.value);
  };


  const states: any = {
    1: "Processing",
    2: "Shipped",
    3: "Delivered",
    4: "Cancelled",
    5: "Returned",
    6: "Refunded",
  };

  const mapper: any = {
    "Processing": 1,
    "Shipped": 2,
    "Delivered": 3,
    "Cancelled": 4,
    "Returned": 5,
    "Refunded": 6,
  };
  const getDetailOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/view/details/items/${state.orderId}`,
        {
          withCredentials: true,
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
          },
        }
      );
      setOrderData(res.data);
        console.log(res.data)
      setSelectedState(mapper[res.data.orderState]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeOrderState = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/admin/change/state/${state.orderId}`,
        {
          orderState: selectedState,
        },
        {
          withCredentials: true,
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
          },
        }
      );
      alert("상태 변경에 성공했습니다.")
    } catch (error) {
        alert("오류가 발생했습니다.");
        console.error(error);
    }
  };

  useEffect(() => {
    if (!state.orderId) {
      alert("유효하지 않은 접근입니다.");
      navigate("/admin");
    } else {
      getDetailOrder();
    }
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
              <StyledTh>Order State</StyledTh>
              <StyledTh>Total Amount</StyledTh>
              <StyledTh>Receiver Name</StyledTh>
              <StyledTh>Receiver Phone</StyledTh>
            </tr>
          </thead>
          <tbody>
            <StyledTr>
              <StyledTd>{orderData.orderId}</StyledTd>
              <StyledTd>
                <Select
                  id="orderState"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {Object.keys(states).map((key) => (
                    <option key={key} value={key}>
                      {states[key]}
                    </option>
                  ))}
                </Select>
              </StyledTd>
              <StyledTd>
                {(orderData.totalAmount * 1000).toLocaleString()} {!isMobile && "won"}
              </StyledTd>
              <StyledTd>{orderData.receiverName}</StyledTd>
              <StyledTd>{orderData.receiverPhone}</StyledTd>
              {/* <StyledTd>{orderData.shippingAddress}</StyledTd> */}
            </StyledTr>
          </tbody>
        </StyledTable>

        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Product ID</StyledTh>
              <StyledTh>Product Name</StyledTh>
              <StyledTh>Price</StyledTh>
              <StyledTh>Quantity</StyledTh>
              <StyledTh>Subtotal</StyledTh>
            </tr>
          </thead>
          <tbody>
            {orderData.items.map((item: any) => (
              <StyledTr key={item.productId}>
                <StyledTd>{item.productId}</StyledTd>
                <StyledTd>{item.productName}</StyledTd>
                <StyledTd>{(item.price * 1000).toLocaleString()} {!isMobile && "won"}</StyledTd>
                <StyledTd>{item.quantity}</StyledTd>
                <StyledTd>
                  {(item.quantity * item.price * 1000).toLocaleString()} {!isMobile && "won"}
                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>

      <Button onClick={()=> handleChangeOrderState()}>상태 변경하기</Button>

    </Wrapper>
  );
}
