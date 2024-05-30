import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import axios from "axios";

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
  padding: 100px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 50px auto;

  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
`;

const Label = styled.label`
  width: 150px;
  display: flex;
  align-items: center;
  font-size: 14px;
  min-width: 150px;
  background: #efefef;
  height: 50px;
  padding-left: 12px;
`;

const Input = styled.input`
  width: calc(100% - 160px);
  padding: 10px;
  border: 1px solid #ccc;

  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
`;

const HalfInput = styled(Input)`
  width: calc(50% - 80px);
`;

const FullWidthInput = styled(Input)`
  width: calc(100% - 160px);
`;

const Select = styled.select`
  width: 160px;
  padding: 10px;
  border: 1px solid #ccc;

  font-size: 14px;

  margin-left: 10px;
  margin-right: 10px;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const RadioLabel = styled.label`
  margin-right: 20px;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #fff;
  color: #777;
  border: none;
  border: 1px solid #8a8a8a;
    min-width: 60px;
  cursor: pointer;
  font-size: 14px;
    border-left: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const LastButton = styled.div`
    font-size: 20px;
    font-weight: bold;
    font-family: "Poppins";
  color: #fff;
  background: #000;
  padding: 10px 20px;
`
export default function Admin() {
  const [items, setItems] = useState([]);

  const getItems = async() => {
    try {
      const res = await axios.get("http://localhost:8080/admin/product/all", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token")
        }
      })
      console.log(res);
    } catch(e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getItems();
  }, [])
  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Title>기본검색</Title>
        <Form>
          <FormRow>
            <Label htmlFor="searchKeyword">검색어</Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select id="searchType">
                <option>상품명</option>
              </Select>
              <Input id="searchKeyword" type="text" />
            </div>
          </FormRow>
          <FormRow>
            <Label htmlFor="category">카테고리</Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select id="category">
                <option>카테고리 선택</option>
              </Select>
              <Select id="subCategory">
                <option>카테고리 선택</option>
              </Select>
            </div>
          </FormRow>
          <FormRow>
            <Label htmlFor="dateRange">기간검색</Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select id="dateType">
                <option>최근수정일</option>
              </Select>
              <Input id="startDate" type="date" />
              <span>~</span>
              <Input id="endDate" type="date" />
              <Button style={{ borderLeft: "1px solid #8a8a8a"}}>오늘</Button>
              <Button>어제</Button>
              <Button>일주일</Button>
              <Button>지난달</Button>
              <Button>1개월</Button>
              <Button>3개월</Button>
              <Button >전체</Button>
            </div>
          </FormRow>
          <Grid>
            <FormRow>
              <Label htmlFor="brand">브랜드</Label>
              <Select id="brand">
                <option>전체</option>
              </Select>
            </FormRow>
            <FormRow>
              <Label htmlFor="brand">배송가능 지역</Label>
              <Select id="brand">
                <option>전체</option>
              </Select>
            </FormRow>
          </Grid>

          <Grid>
            <FormRow>
              <Label htmlFor="stock">상품재고</Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input id="minStock" type="number" placeholder="개 이상" />
                <span>~</span>
                <Input id="maxStock" type="number" placeholder="개 이하" />
              </div>
            </FormRow>
            <FormRow>
              <Label htmlFor="price">상품가격</Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Select id="priceType">
                  <option>판매가격</option>
                </Select>
                <Input id="minPrice" type="number" placeholder="원 이상" />
                <span>~</span>
                <Input id="maxPrice" type="number" placeholder="원 이하" />
              </div>
            </FormRow>
          </Grid>
          <Grid>
            <FormRow>
              <Label>판매여부</Label>
              <RadioWrapper>
                <RadioLabel>
                  <input
                    type="radio"
                    name="saleStatus"
                    value="전체"
                    defaultChecked
                  />{" "}
                  전체
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="saleStatus" value="진열" /> 진열
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="saleStatus" value="품절" /> 품절
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="saleStatus" value="단종" /> 단종
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="saleStatus" value="중지" /> 중지
                </RadioLabel>
              </RadioWrapper>
            </FormRow>

            <FormRow>
              <Label>필수옵션</Label>
              <RadioWrapper>
                <RadioLabel>
                  <input
                    type="radio"
                    name="requiredOption"
                    value="전체"
                    defaultChecked
                  />{" "}
                  전체
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="requiredOption" value="사용" /> 사용
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="requiredOption" value="미사용" />{" "}
                  미사용
                </RadioLabel>
              </RadioWrapper>
            </FormRow>
          </Grid>

          <Grid>
          <FormRow>
            <Label>과세유형</Label>
            <RadioWrapper>
              <RadioLabel>
                <input
                  type="radio"
                  name="taxType"
                  value="전체"
                  defaultChecked
                />{" "}
                전체
              </RadioLabel>
              <RadioLabel>
                <input type="radio" name="taxType" value="과세" /> 과세
              </RadioLabel>
              <RadioLabel>
                <input type="radio" name="taxType" value="비과세" /> 비과세
              </RadioLabel>
            </RadioWrapper>
          </FormRow><FormRow>
            <Label>추가옵션</Label>
            <RadioWrapper>
              <RadioLabel>
                <input
                  type="radio"
                  name="taxType"
                  value="전체"
                  defaultChecked
                />{" "}
                전체
              </RadioLabel>
              <RadioLabel>
                <input type="radio" name="additional" value="전체" /> 전체
              </RadioLabel>
              <RadioLabel>
                <input type="radio" name="additional" value="사용" /> 사용
              </RadioLabel>
              <RadioLabel>
                <input type="radio" name="additional" value="미사용" /> 미사용
              </RadioLabel>
            </RadioWrapper>
          </FormRow>
          </Grid>
          
          <ButtonWrapper>
            <LastButton>검색</LastButton>
            <LastButton style={{ background: "#666"}}>초기화</LastButton>
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
}
