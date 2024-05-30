import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeFileExtension } from "../libs/fileExtension";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
`;

const Container = styled.div`
  width: 80%;
  margin: 50px auto;
  display: flex;
  gap: 100px;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 90%;
    gap: 50px;
  }
`;

const Section = styled.div`
  width: 48%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 34px;
  color: #484848;
  margin-bottom: 20px;
  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

const ProductCard = styled.div`
  border: 1px solid #8a8a8a;
  padding: 20px;
  margin: auto 0;
`;

const Image = styled.img`
  width: 150px;
  height: auto;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
`;

const ProductName = styled.div`
  font-size: 18px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #bababa;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 20px;
`;

const QuantityInput = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
  border: 1px solid #bababa;
  border-left: none;
  box-sizing: border-box;
  font-size: 18px;
  font-family: "Poppins";
  border-right: none;
`;

const SubtotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SubtotalText = styled.div`
  color: #484848;
  font-size: 14px;
  font-family: "Poppins";
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #8a8a8a;

  font-size: 14px;
  font-family: "Poppins";
  padding: 15px 20px;
`;

const FullWidthInput = styled(Input)`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;

  border: 1px solid #8a8a8a;

  font-size: 14px;
  padding: 15px 20px;
  font-family: "Poppins";
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  label {
    font-family: "Poppins";
    color: #8a8a8a;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 30px;
  accent-color: #fff;
  height: 30px;
`;

const Label = styled.label`
  font-size: 16px;
  width: 80px;
  min-width: 80px;
  margin-bottom: 5px;
`;

const HalfWidthInput = styled(Input)`
  width: 48%;
`;

const ThirdWidthInput = styled(Input)`
  width: 32%;
`;

const Button = styled.button`
  padding: 15px;

  background: #000;
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  font-family: "Poppins";
`;

const ProductHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #0000004c;
  padding-bottom: 20px;
`;

const InputWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-left: 0;
  appearance: none;

  border: 2px solid #000;

  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #000;
  }
  &:checked::after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>');
    background-size: cover;
  }
`;

const SearchInput = styled.div`
  position: relative;
  width: 100%;
  button {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 34px;
    display: flex;
    align-items: center;
    color: #8a8a8a;
    border: none;

    cursor: pointer;
    border: 1px solid #8a8a8a;
    background: #fff;
    font-size: 14px;
    border-radius: 0;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default function Payment() {
  const [quantity, setQuantity] = useState(1);
  const [info, setInfo] = useState<any>({
    name: "",
    phone1: "",
    phone2: "",
    phone3: "",
    address: "",
  });
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleQuantityChange = (delta: any) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const [cartItems, setCartItems] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);


  const handleBuy = async () => {
    const payload = {
      receiverName: info.name,
      receiverPhone: `${info.phone1}-${info.phone2}-${info.phone3}`,
      shippingAddress: info.address,
      qty: 0,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/order/cart",
        payload,
        {
          withCredentials: true,
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
          },
        }
      );
      alert("구매에 성공했습니다.");
      navigate("/order");
    } catch (e) {
      console.error(e);
    }
  };

  const handleBuyOne = async () => {
    if (!state.itemData) {
      alert("상품정보가 없습니다.");
      return;
    }

    const payload = {
      receiverName: info.name,
      receiverPhone: `${info.phone1}-${info.phone2}-${info.phone3}`,
      shippingAddress: info.address,
      qty: quantity,
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/order/detail/${state.itemData.productId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
          },
        }
      );
      alert("구매에 성공했습니다.");
      navigate("/order");
    } catch (error) {
      console.error(error);
      alert("로그인이 필요합니다.");
      navigate("/login")
      

    }
  };

  const getItemsInCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/cart/getCart", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
        },
      });

      console.log(res.data);
      setCartItems(res.data);
    } catch (e: any) {
      if (e.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (state.type === "one") {
      console.log(state.itemData);
    } else if (state.type === "many") {
      getItemsInCart();

    }
  }, []);

  useEffect(() => {
    let result = 0;
    for(const i of cartItems) {
      result += i.quantity * i.price
    }
    result *= 1000;
    setTotal(formatNumberWithCommas(result.toString()));

  }, [cartItems]);

  const formatNumberWithCommas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Section>
          <Title>Product</Title>
          {state.type === "one" && (
            <ProductCard>
              <ProductHeader>
                <Image src={`/item/${(state.itemData.image)}`} alt="Product" />
                <ProductInfo>
                  <ProductName>{state.itemData.name}</ProductName>
                  <QuantityWrapper>
                    <QuantityButton onClick={() => handleQuantityChange(-1)}>
                      -
                    </QuantityButton>
                    <QuantityInput value={quantity} readOnly />
                    <QuantityButton onClick={() => handleQuantityChange(1)}>
                      +
                    </QuantityButton>
                  </QuantityWrapper>
                </ProductInfo>
              </ProductHeader>

              <SubtotalWrapper>
                <SubtotalText>주문상품</SubtotalText>
                <SubtotalText>{`${(
                  30000 * quantity
                ).toLocaleString()} 원`}</SubtotalText>
              </SubtotalWrapper>
              <SubtotalWrapper>
                <SubtotalText>배송비</SubtotalText>
                <SubtotalText>{`+${(
                  0 * quantity
                ).toLocaleString()} 원`}</SubtotalText>
              </SubtotalWrapper>
              <SubtotalWrapper>
                <SubtotalText>최종 결제 금액</SubtotalText>
                <SubtotalText>{`${(
                  30000 * quantity
                ).toLocaleString()} 원`}</SubtotalText>
              </SubtotalWrapper>
            </ProductCard>
          )}

          {state.type === "many" && (
            <ProductCard>
              <Cards>
              {cartItems.map((data: any) => {
                return (
                  <ProductHeader>
                    <Image src={`/item/${(data.image)}`} alt="Product" />
                    <ProductInfo>
                      <ProductName>{data.name}</ProductName>
                      <QuantityWrapper style={{ width: "100%"}}>
                        {quantity} 개
                      </QuantityWrapper>
                    </ProductInfo>
                  </ProductHeader>
                );
              })}
              </Cards>
              

              <SubtotalWrapper>
                <SubtotalText>주문상품</SubtotalText>
                <SubtotalText>{`${total} 원`}</SubtotalText>
              </SubtotalWrapper>
              <SubtotalWrapper>
                <SubtotalText>배송비</SubtotalText>
                <SubtotalText>{`+${(
                  0 * quantity
                ).toLocaleString()} 원`}</SubtotalText>
              </SubtotalWrapper>
              <SubtotalWrapper>
                <SubtotalText>최종 결제 금액</SubtotalText>
                <SubtotalText>{`${total} 원`}</SubtotalText>
              </SubtotalWrapper>
            </ProductCard>
          )}

          
        </Section>
        <Section>
          <Form>
            <Title>Delivery</Title>

            <InputWrap>
              <Label>받는 사람</Label>
              <Input
                type="text"
                placeholder="받는 사람"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
              />
            </InputWrap>

            <InputWrap>
              <Label>주소</Label>
              <Input
                type="text"
                placeholder="도로명 주소"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
              />
            </InputWrap>

            <InputWrap>
              <Label>휴대전화</Label>
              <InputRow>
                <ThirdWidthInput
                  type="text"
                  onChange={(e) => setInfo({ ...info, phone1: e.target.value })}
                />
                <ThirdWidthInput
                  type="text"
                  onChange={(e) => setInfo({ ...info, phone2: e.target.value })}
                />
                <ThirdWidthInput
                  type="text"
                  onChange={(e) => setInfo({ ...info, phone3: e.target.value })}
                />
              </InputRow>
            </InputWrap>

            {/* <Title style={{ margin: "10px 0 0 0" }}>Payment</Title>
            <FullWidthInput type="text" placeholder="Credit Card" /> */}
            <CheckboxWrapper>
              <CustomCheckbox type="checkbox" />
              <label>Save This Info For Future</label>
            </CheckboxWrapper>
            <Button
              onClick={() => {
                if (state.type === "one") handleBuyOne();
                else if (state.type === "many") handleBuy();
              }}
            >
              Pay Now
            </Button>
          </Form>
        </Section>
      </Container>
    </Wrapper>
  );
}
