import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../../components/MainHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeFileExtension } from "../../libs/fileExtension";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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
  @media screen and (max-width: 600px) {
    position: static;
    margin-top: 0;
    margin-bottom: 20px;
  }
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

const StarWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 5px;
  border: 1px solid #efefef;
  border-radius: 30px;
  height: 30px;
  width: 30px;
  display: flex;
  svg {
    margin: auto;
    width: 20px;
    height: 20px;
  }
`

export default function Soap() {
  const navigate = useNavigate();
  
  
  const [selectedCategory, setSelectedCategory] = useState<any>(1);
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState<any>([]);

  const itemsPerPage = 8;
  
  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getItems = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/product/category?categoryId=4`, {
        withCredentials: true
      })
      setItems(res.data);
      console.log(res.data);
    } catch(e) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  }

  useEffect(() => {
    getItems();
    getLike();

  }, [selectedCategory]);

  const getLike = async() => {
    try {
      const res = await axios.get("http://localhost:8080/like/list", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem('token')
        }
      })
      const t:any = []

      for(const i of res.data) {
        t.push(i.productId);
      }
      setLikes(t);
    } catch(e) {
      alert("로그인이 필요합니다.");
      navigate("/login")
    }
  }

  const handleLike = async(productId: any) => {
    try {
      const res = await axios.post(`http://localhost:8080/like/${productId}`, null, {
        withCredentials: true,
        headers: {
          'X-Auth-Token': localStorage.getItem("token")
        }
      })

      if(likes.includes(productId)) {
        const newArray = likes.filter((item: any) => item !== productId);
        setLikes(newArray);
      } else {
        const t = [...likes];
        t.push(productId);
        setLikes(t);
      }
    } catch (error) {
      console.log(error);
      alert("에러가 발생했습니다.");
    }
  }

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
      <SubHeader>Soap</SubHeader>
      <Items>
        {currentItems.map((data, idx) => {
          return (
            <div style={{ position: "relative", height: "fit-content" }}>
            <Item
              key={idx}
              
            >
              <ItemImg src={`/item/${data.image}`} onClick={() => navigate("/item", { state: { itemData: data } })}/>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <ItemTitle onClick={() => navigate("/item", { state: { itemData: data } })}>{data.name}</ItemTitle>
                <ItemPrice onClick={() => navigate("/item", { state: { itemData: data } })}>
                  {numberWithCommas(data.price * 1000)}won
                </ItemPrice>
                <StarWrapper onClick={() => handleLike(data.productId)}>
                  {likes.includes(data.productId) ? (
                    <AiFillStar style={{ color: "#ffcc00" }} />
                  ) : (
                    <AiOutlineStar />
                  )}
                </StarWrapper>
              </div>
            </Item>
          </div>
            
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