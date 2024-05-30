import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../../components/MainHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeFileExtension } from "../../libs/fileExtension";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;

`;

const SubHeader = styled.div`
  color: #141e0c;
  font-weight: 600;
  font-size: 20px;
  margin: 0 auto;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 54px auto 30px;

  padding: 0px 100px;
  box-sizing: border-box;
  gap: 120px;
  position: relative;
  padding: 0 100px;
  min-height: 1098px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 80px;
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    padding: 0 20px;
    gap: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
`;

const ItemImg = styled.img`
  object-fit: contain;
  margin-bottom: 40px;
  width: 100%;
  height: 400px;
  @media screen and (max-width: 600px) {
    height: 24vh;
  }
`;

const ItemTitle = styled.div`
  font-family: "Volkhov";
  margin-bottom: 8px;
  font-size: 15px;
`;

const ItemPrice = styled.div`
  font-family: "Jost";
  font-size: 15px;
`;

const Filter = styled.select`
  margin-top: 20px;
  font-family: "Volkhov";
  width: fit-content;
  border: none;
  position: absolute;
  top: -80px;
  left: 100px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 100px;
  gap: 10px;
  
`;

const PageButton = styled.button`
  

  height: 40px;
  width: 40px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50px;
  &:hover {
    background-color: #f0f0f0;
  }
  &:disabled {
    background-color: #efefef;
    cursor: not-allowed;
    color: #000;
  }
`;


const PrevButton = styled.div`  
  display: flex;
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
  margin-left: 100px;
  top: -30px;
  padding: 8px 20px;
  align-items: center;
  gap: 20px;
  width: fit-content;
  cursor: pointer;
  img {
    transform: rotate(-180deg);
    width: 10px;
    height: 10px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 10px;
  }
`

export default function AdminViewItem() {
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState<any>(1);
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getItems = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/view/product/1/1000  `, {
        withCredentials: true,
        headers: {
          'X-Auth-Token': localStorage.getItem("token")
        }
      })
      console.log(res);
      console.log(res.data);
      setItems(res.data);
      console.log(res.data);
    } catch(e: any) {
      if(e.response.status === 401) {
        alert("로그인이 필요합니다");
        navigate("/admin/login")
      }
      else {
        alert("에러가 발생했습니다.");
        console.error(e);
      }
      
    }
  }

  useEffect(() => {
    getItems();
  }, [selectedCategory]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0})
  };

  // Calculate the items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <Wrapper>
      <MainHeader />
      <PrevButton onClick={()=> navigate(-1)}>
          <img src="/arrowRight.svg"/>
          돌아가기</PrevButton>
      <Items>
      
        {currentItems && currentItems.map((data, idx) => {
          return (
            <Item key={idx} onClick={() => navigate("/item", { state: { itemData: data } })}>
              <ItemImg src={`/item/${(data.image)}`} />
              <ItemTitle>{data.name}</ItemTitle>
              <ItemPrice>{numberWithCommas(data.price * 1000)}won</ItemPrice>
            </Item>
          );
        })}
      </Items>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Wrapper>
  );
}