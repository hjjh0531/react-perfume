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
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  padding: 40px 50px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  background-image: url('/rect.png');
  background-size: cover;
  background-position: center;
  color: white;
`;

const Title = styled.div`
  font-size: 24px;

  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  border-radius: 4px;
  background-color: #fff;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 16px;
  outline: none;
  border-bottom: 1px solid #9d9d9d;
  margin: 15px;
`;

const SearchButton = styled.button`
position: absolute;
right: 15px;
top: 12px;
  padding: 10px;
    background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;



    img {
        width: 15px;
        height: 15px;
        object-fit: contain;
    }
`;

const PopularSearches = styled.div`
  margin-top: 20px;
`;

const PopularSearchTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Tag = styled.button`
  padding: 10px 15px;
  margin: 5px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Search() {
  return (
    <Wrapper>
      <MainHeader />
      <Container>
      <Title>제품 찾기</Title>
      <SearchBar>
        <SearchInput type="text" placeholder="검색어를 입력하세요..." />
        <SearchButton>
          <img src="/search.svg"/>
        </SearchButton>
      </SearchBar>
      <PopularSearches>
        <PopularSearchTitle>인기 검색어</PopularSearchTitle>
        <div>
          <Tag># 베어허그</Tag>
          <Tag># 우디</Tag>
          <Tag># 도손</Tag>
          <Tag># 시트러스</Tag>
        </div>
      </PopularSearches>
    </Container>
    </Wrapper>
  );
}
