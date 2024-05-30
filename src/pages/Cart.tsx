import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { removeFileExtension } from "../libs/fileExtension";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
  padding-bottom: 100px;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

const Table = styled.div`
  display: table;
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  position: relative;
  @media screen and (max-width: 600px) {
    font-size: 13px;

  }
`;

const Row = styled.div`

  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr 3fr 3fr;
  border-bottom: 1px solid lightgray;
`;

const Cell = styled.div`
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  vertical-align: middle;
  width: 100%;
  overflow: hidden;
`;

const HeaderCell = styled(Cell)`

`;

const Image = styled.img`
  width: 100px;
  height: auto;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ProductName = styled.div`
  font-size: 18px;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

const Price = styled.div`
  font-size: 18px;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;

`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #eee;
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 20px;
`;

const QuantityInput = styled.input`
  width: 30px;

  text-align: center;
  border: 1px solid #eee;
  border-left: none;
  height: 30px;
  box-sizing: border-box;
  border-right: none;

font-family: "Poppins";
font-size: 18px;
    color: #8a8a8a;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  text-decoration: underline;
  font-family: "Poppins";
  padding: 0;
  margin-top: 30px;
    text-align: left;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  accent-color: #000;
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  margin: 20px 0;
`;

const SelectAll = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const SubtotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const SubtotalText = styled.div`

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
  border-radius: 4px;
`;

const Footer = styled.div`
  width: 50%;
  margin-top: 100px;
  margin-left: 50%;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 20px auto;
  }
`;

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

const DeleteButton = styled.div`
  display: flex;

  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  svg {

    width: 25px;
    height: 25px;
    margin: auto;
  }
`

const formatNumberWithCommas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

type ProductRowProps = {
  product: any;
  onRemove: Function;
  onQuantityChange: Function;
  setProducts: Function;
  idx: number;
  products: any[]
};

const ProductRow = ({
  product,
  onRemove,
  onQuantityChange,
  setProducts,
  products,
  idx
}: ProductRowProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});

  return (
    <Row>
      <Cell style={{ width: "fit-content"}}>

      </Cell>
      <Cell style={{ width: "fit-content"}}>
        <Image src={`/item/${removeFileExtension(product.image)}.png`} alt={product.name} />
      </Cell>
      <Cell style={{ flexDirection: "column"}}>
        <ProductName>{product.name}</ProductName>

      </Cell>
      <Cell>
        <Price>{formatNumberWithCommas((product.price * 1000).toString())} {!isMobile && "won"}</Price>
      </Cell>
      <Cell>
        <QuantityWrapper>
          {/* <QuantityButton onClick={() => onQuantityChange(product.id, -1)} style={{ borderRight: "none"}}>
            -
          </QuantityButton> */}
          {/* <QuantityInput type="text" value={product.quantity} readOnly /> */}
          <div>{product.quantity}</div>
          {/* <QuantityButton onClick={() => onQuantityChange(product.id, 1)} style={{ borderLeft: "none"}}>
            +
          </QuantityButton> */}
        </QuantityWrapper>
      </Cell>
      <Cell >
      <Price style={{ width: "100%", textAlign: "right"}}>{formatNumberWithCommas((product.price * product.quantity* 1000).toString())} {!isMobile && "won"}</Price>
      </Cell>
    </Row>
  );
};

export default function Cart() {
  const [products, setProducts] = useState<any>([

  ]);

  const [subtotal, setSubtotal] = useState<any>(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});
  const [isCheckedAll, setIsCheckedAll] = useState<any>(false);


  const handleRemove = (id: any) => {
    setProducts(products.filter((product: any) => product.id !== id));
  };

  const handleQuantityChange = (id: any, delta: any) => {
    setProducts(
      products.map((product: any) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity + delta),
              totalPrice: product.price * Math.max(1, product.quantity + delta),
            }
          : product
      )
    );
  };

  


  const getItemsInCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/cart/getCart", {
        withCredentials: true,
        headers: {
          "X-Auth-Token" : localStorage.getItem("token")
        }
      })

      console.log(res.data);

      const copied: any = []

      for(const i of res.data) {
        copied.push({...i,
          isChecked: false
        })
      }
      setProducts(copied);

    } catch(e: any) {
      if(e.response.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login")
      }
    }
  }
  

  const handleDeleteCart = async() => {
    try {
      const res = await axios.delete("http://localhost:8080/cart/removeCart", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token")
        }
      })

      console.log(res);
      getItemsInCart();
    } catch (error) {
      
    }
  }

  
  useEffect(() => {
    getItemsInCart();
  }, [])

  useEffect(() => {
    let result = 0;
    for(const i of products) {
      result += i.quantity * i.price
    }
    setSubtotal(formatNumberWithCommas((result*1000).toString()));
  }, [products]);

  useEffect(() => {
    for(const i of products) {
      if(!i.isChecked) {
        setIsCheckedAll(false)
        return;
      }
    }
    setIsCheckedAll(true);
  }, [products])

  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Table>
        <DeleteButton onClick={()=> handleDeleteCart()}>
                <IoCloseOutline />
              </DeleteButton>
          <Row>
            <HeaderCell style={{ width: "fit-content"}}><CustomCheckbox style={{ visibility: "hidden" }}/>
              
            </HeaderCell>
            <HeaderCell style={{ width: "fit-content"}}>Product</HeaderCell>
            <HeaderCell></HeaderCell>
            <HeaderCell>Price</HeaderCell>
            <HeaderCell style={{ textAlign: "center"}}>Quantity</HeaderCell>
            <HeaderCell >
                <div style={{ width: "100%", textAlign: "right"}}>
                Total
                </div>
                </HeaderCell>
          </Row>
          {products.map((product: any, idx: number) => (
            <ProductRow
            idx={idx}
            products={products}
              key={product.id}
              product={product}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
              setProducts={setProducts}
            />
          ))}
        </Table>

        <Footer>
          {/* <SelectAll>
            <CustomCheckbox type="checkbox" checked={isCheckedAll} onClick={()=> {
              const copied: any = [...products]
              for(let i=0;i<copied.length;i++){
                if(isCheckedAll) copied[i].isChecked = false;
                else copied[i].isChecked = true;
                
              }
              setProducts(copied);
              setIsCheckedAll(!isCheckedAll);
            }}/> Select All
          </SelectAll> */}

          <Divider />
          <SubtotalWrapper>
            <SubtotalText>Subtotal</SubtotalText>
            <SubtotalText>{subtotal} Won</SubtotalText>
          </SubtotalWrapper>
          <BuyButton onClick={() => navigate("/payment", { state: {
            type: "many"
          }})}>Buy</BuyButton>
        </Footer>
      </Container>
    </Wrapper>
  );
}
