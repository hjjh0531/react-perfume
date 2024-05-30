import React, { useState } from "react";
import MainHeader from "../../components/MainHeader";
import styled from "styled-components";
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
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  position: relative;

  box-sizing: border-box;

`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;

  border: 1px solid #8a8a8a;
  @media screen and (max-width: 600px) {
    width: 90vw;
    font-size: 13px;
}
`;

const FormGroup = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const Label = styled.label`
  width: 100px;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  border-right: 1px solid gray;
  @media screen and (max-width: 600px) {
    width: 80px;
}
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #8a8a8a;

  max-width: 300px;
  margin: 5px 10px;
  @media screen and (max-width: 600px) {
    width: 120px;
    max-width: 120px;
}
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 8px;
  border: 1px solid #8a8a8a;

  margin: 5px 10px;
  margin-bottom: 0;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid #8a8a8a;
  max-width: 300px;
  margin: 5px 10px;
  @media screen and (max-width: 600px) {
    width: 120px;
    max-width: 120px;
}
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input`
  margin-left: 10px;
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-family: "Poppins";
  margin: 30px auto;
  width: fit-content;
  font-size: 20px;
  padding: 5px 20px;
  &:hover {
    background-color: #333;
  }
`;


const PrevButton = styled.div`  
  display: flex;
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
  position: absolute;
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
export default function AdminAddItem() {
  const [info, setInfo] = useState<any>({
    company: "",
    content: "",
    image: "",
    name: "",
    point: "",
    price: 0,
    qty: 0,
    spec: "",
    categoryId: 0,
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)"});

  const handleAddItem = async () => {
    console.log(info);
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/add/product",
        info,
        {
          withCredentials: true,
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
          },
        }
      );

      alert("등록이 완료되었습니다.");
      navigate("/admin")
    } catch (e: any) {
        if(e.response.status === 401) {
            alert('관리자 로그인이 필요합니다.');
            navigate("/admin/login")
        }
      console.error(e);
    }
  };
  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <PrevButton onClick={()=> navigate(-1)}>
          <img src="/arrowRight.svg"/>
          돌아가기</PrevButton>
        <Form>
          <FormGroup>
            <Label htmlFor="category" style={{ paddingTop: 10 }}>
              카테고리 선택
            </Label>
            <Select style={{ marginTop: 10 }} onChange={(e) => setInfo({ ...info, categoryId: e.target.value })}>
              <option value="">카테고리 선택</option>
              <option value="1">Citrus</option>
              <option value="2">Musk</option>
              <option value="3">Soap</option>
              <option value="4">Sweet</option>
              <option value="5">Floral</option>
              <option value="6">Woody</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="productName">상품명</Label>
            <Input
              id="productName"
              name="productName"
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="shortDescription">짧은 설명</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              onChange={(e) => setInfo({ ...info, content: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="shortDescription">상품 용량</Label>
            <Input
              onChange={(e) => setInfo({ ...info, spec: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company">회사명</Label>
            <Input
              id="company"
              name="company"
              onChange={(e) => setInfo({ ...info, company: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company">포인트</Label>
            <Input
              type="number"
              onChange={(e) => setInfo({ ...info, point: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">가격</Label>
            <Input
              id="price"
              name="price"
              type="number"
              onChange={(e) => setInfo({ ...info, price: e.target.value })}
            />
            <span style={{ display: "flex", alignItems: "center" }}>원</span>
          </FormGroup>
          <FormGroup>
            <Label>수량</Label>
            <RadioGroup>
              <label style={{ display: "flex", alignItems: "center" }}>
                <Input
                  name="quantityValue"
                  type="number"
                  style={{ margin: 0, marginLeft: 10 }}
                  onChange={(e) => setInfo({ ...info, qty: e.target.value })}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  개
                </div>
              </label>
            </RadioGroup>
          </FormGroup>
          <FormGroup>
            <Label style={{ paddingBottom: 10 }}>상품 이미지</Label>
            <RadioGroup>
              <label style={{ paddingLeft: isMobile ? 0 : 10 }}>
                {/* <RadioButton type="radio" name="imageUpload" value="direct" defaultChecked /> 직접 업로드 */}
                {/* <Input type="file" style={{ marginLeft: '10px', marginBottom: 10 }} /> */}
                {!isMobile && "URL 입력" }
                <Input
                  type="url"
                  style={{ marginLeft: "10px", marginBottom: 10 }}
                  onChange={(e) => setInfo({ ...info, image: e.target.value })}
                />
              </label>
            </RadioGroup>
          </FormGroup>
        </Form>
        <SubmitButton type="submit" onClick={()=>handleAddItem()}>저장</SubmitButton>
      </Container>
    </Wrapper>
  );
}
