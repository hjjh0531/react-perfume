import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { removeFileExtension } from "../libs/fileExtension";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin: 30px auto;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    margin-top: 0;
    width: 100%;
  }
 `;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;

  @media screen and (max-width: 600px) {
    display: grid;
    border-top: 1px solid #000;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    box-sizing: border-box;
    padding-top: 20px;

  }
`;

const ItemImg = styled.img`
  width: 90%;
  margin: 0 auto;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #484848;
  margin: 30px auto;
`;

const LeftTitle = styled.div`
  font-family: "Poppins";
  font-weight: 700;
  font-size: 21px;
  color: #484848;
  margin-top: 30px;
`;

const LeftDescription = styled.div`
  font-size: 17px;
  color: #484848;
  font-family: "Poppins";
  white-space: pre-wrap;
  font-weight: 500;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 400px;
  position: relative;
  margin: auto;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-family: "Volkhov";
`;

const Description = styled.p`
  color: gray;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  font-family: "Volkhov";
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #eee;
  height: 40px;
  cursor: pointer;
  box-sizing: border-box;
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  box-sizing: border-box;
  text-align: center;
  height: 40px;
  border: 1px solid #eee;

  border-left: none;
  border-right: none;
`;

const AddToCartButton = styled.button`
  height: 40px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
  flex-grow: 1;
  margin-left: 10px;
  border-radius: 5px;
  font-family: "Volkhov";
  font-size: 17px;
`;

const QuantityTitle = styled.div`
  font-family: "Volkhov";
  font-size: 16px;
  font-weight: 500;
margin-top: 50px;
`

const SelectAllWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  margin-top: 50px;
  color: #8a8a8a;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  accent-color: #000;
  width: 20px;

  height: 20px;
`;

const Divider2 = styled.div`
  border-bottom: 1px solid lightgray;
  margin: 20px 0;
`;

const SubtotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-family: "Volkhov";

`;

const SubtotalText = styled.p`

`;

const BuyButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 7px;
  font-family: "Poppins";
  
`;

const StarButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  width: 35px;
  height: 35px;
  border: 1px solid #eee;
  display: flex;
  border-radius: 45px;
  svg {
    width: 20px;
    height: 20px;
    margin: auto;
  }

  
`
const CustomCheckbox = styled.input.attrs({ type: "checkbox"})`
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
    content: '';
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
`
export default function ItemDetail() {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});

  
  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleQuantityChange = (delta: any) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  
  const handleAddCart = async () => {
    console.log(localStorage.getItem("token"));
    console.log(state.itemData.productId);

    try {
      const res = await axios.post('http://localhost:8080/cart/addCart', {
        productQuantities: {
          [state.itemData.productId]: quantity
        }
      }, {
        withCredentials: true,
        headers: {
          'X-Auth-Token': localStorage.getItem("token")
        }
      });

      console.log(res);
      navigate("/cart")
    } catch (error: any) {

      if(error.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
      console.log(error);
    }
  }


  const handleLike = async() => {
    try {
      const res = await axios.post(`http://localhost:8080/like/${state.itemData.productId}`, {
        
      }, {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token")
        }
      })
      navigate("/pick")
    } catch (error) {
      console.error(error);
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }

  const getLike = async() => {
    try {
      const res = await axios.get("http://localhost:8080/like/list", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token")
        }
      });
      for(const i in res.data) {
        if(res.data[i].productId === state.itemData.productId) {
          setIsLiked(true);
        }
      }

      console.log(res.data, state);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    console.log(state.itemData);
    getLike();
  }, [])

  if(!isMobile) {
    return (
      <Wrapper>
        <MainHeader />
        <Body>
          <Left>
            <ItemImg src={`/item/${(state.itemData.image)}`} />
            <Divider />
            {/* <LeftTitle>CLEAN COTTON</LeftTitle> */}
            <LeftDescription>
              <div>{state.itemData.content}</div>
            </LeftDescription>
          </Left>
          <Container>
            <StarButton onClick={() => handleLike()}>
              {isLiked ? <AiFillStar style={{ color: "#ffcc00" }}/> : <AiOutlineStar />}
              
            </StarButton>
            <Title>{state.itemData.name}</Title>
            {/* <Description>#코튼향 #은은향</Description> */}
            <Price>{numberWithCommas(state.itemData.price * 1000)}won</Price>
            <QuantityTitle>Quantity</QuantityTitle>
            <QuantityWrapper>
              <QuantityButton onClick={() => handleQuantityChange(-1)} style={{ borderRight: "none"}}>
                -
              </QuantityButton>
              <QuantityInput type="text" value={quantity} readOnly />
              <QuantityButton onClick={() => handleQuantityChange(1)} style={{ borderLeft: "none"}}>
                +
              </QuantityButton>
              <AddToCartButton onClick={()=>handleAddCart()}>Add to cart</AddToCartButton>
            </QuantityWrapper>
            
            
            <Divider2 />
            <SubtotalWrapper>
              <SubtotalText>Subtotal</SubtotalText>
              <SubtotalText>{numberWithCommas(state.itemData.price * 1000 * quantity)} Won</SubtotalText>
            </SubtotalWrapper>
            <BuyButton onClick={()=>navigate("/payment", { state: {
              itemData: state.itemData,
              type: "one"
            }})}>Buy</BuyButton>
          </Container>
        </Body>
      </Wrapper>
    );
  }
  else {
    return (
      <Wrapper>
        <MainHeader />
        <Body>
          <Left>
            <div>
            <ItemImg src={`/item/${(state.itemData.image)}`} />

            {/* <LeftTitle>CLEAN COTTON</LeftTitle> */}
            <LeftDescription>
              <div>{state.itemData.content}</div>
            </LeftDescription>
            </div>
            <div style={{ position: "relative"}}>
            <StarButton onClick={() => handleLike()}>
              <img src="/star.svg" />
            </StarButton>
            <Title>{state.itemData.name}</Title>
            {/* <Description>#코튼향 #은은향</Description> */}
            <Price>{numberWithCommas(state.itemData.price * 1000)}won</Price>
            </div>

            
          </Left>
          <Container>
            
            <QuantityTitle>Quantity</QuantityTitle>
            <QuantityWrapper>
              <QuantityButton onClick={() => handleQuantityChange(-1)} style={{ borderRight: "none"}}>
                -
              </QuantityButton>
              <QuantityInput type="text" value={quantity} readOnly />
              <QuantityButton onClick={() => handleQuantityChange(1)} style={{ borderLeft: "none"}}>
                +
              </QuantityButton>
              <AddToCartButton onClick={()=>handleAddCart()}>Add to cart</AddToCartButton>
            </QuantityWrapper>
            
            
            <Divider2 />
            <SubtotalWrapper>
              <SubtotalText>Subtotal</SubtotalText>
              <SubtotalText>{numberWithCommas(state.itemData.price * 1000 * quantity)} Won</SubtotalText>
            </SubtotalWrapper>
            <BuyButton onClick={()=>navigate("/payment", { state: {
              itemData: state.itemData,
              type: "one"
            }})}>Buy</BuyButton>
          </Container>
        </Body>
      </Wrapper>
    );
  }
  
}
