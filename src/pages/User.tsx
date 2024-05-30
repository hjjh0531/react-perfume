import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Volkhov";
`;

const Container = styled.div`
  width: 700px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  border: 1px solid #dfdfdf;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  /* justify-content: space-between; */

  border-bottom: 1px solid #dfdfdf;

`;

const Label = styled.label`
  width: 150px;
  display: flex;
  align-items: center;
  font-size: 14px;
  background: #efefef;
  min-width: 150px;
  
  padding-left: 20px;
`;

const Input = styled.input`
  width: calc(100% - 160px);
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box;
  font-size: 14px;
`;


const ProfileImg = styled.img`
  width: 70px;
  margin: auto;
`


const InfoWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  color: #666;
  font-size: 18px;
  line-height: 1.5;
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoItem = styled.p`
  margin: 5px 0;
`;

const Button = styled.div`
  cursor: pointer;
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  img {
    width: 10px;
    height: 10px;
  }
`

const Buttons = styled.div`
display: flex;
gap: 10px;
margin-top: 20px;

@media screen and (max-width: 600px){
  flex-direction: column;
}
`
export default function User () {
  const [info, setInfo] = useState<any>({
    name: "",
    phone: "",
    email: ""
  });
  const navigate = useNavigate();

  const getUserInfo = async() => {
    console.log(localStorage.getItem("token"));

    if(!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get("http://localhost:8080/member/info", {
        withCredentials: true,
        headers: {
          "X-Auth-Token": localStorage.getItem("token")
        }
      })
      setInfo(res.data);
      console.log(res);
    } catch (error: any) {
      if(error.response.status === 401) {
        navigate("/login")
      }
      console.error()
    }
  }


  const maskName = (name: any) => {
    if (name.length <= 1) return name;
    return name[0] + '*'.repeat(name.length - 1);
  };

  // 전화번호 마스킹
  const maskPhone = (phone: any) => {
    return phone.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-****-$3');
  };

  // 이메일 마스킹
  const maskEmail = (email: any) => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, 3) + '*'.repeat(localPart.length - 3);
    const maskedDomain = domain.replace(/(\w{2})(\w+)(\.\w+)/, '$1****$3');
    return maskedLocalPart + '@' + maskedDomain;
  };


  useEffect(() => {
    getUserInfo();
  }, [])

  return <Wrapper>
    <MainHeader />
      <ProfileImg src="/profile.png" />
    <Container>
    <InfoWrapper>
      <Title>회원정보</Title>
      <InfoItem>이름 {(info.name)}</InfoItem>
      <InfoItem>휴대전화 {(info.phone)}</InfoItem>
      <InfoItem>이메일 {(info.email)}</InfoItem>
      <Buttons>
      <Button onClick={() => navigate("/order")}>
        주문/배송내역 조회
        <img src="/arrowRight.svg" />
      </Button>
      <Button onClick={() => {
        Cookies.remove("JSESSIONID");

        localStorage.removeItem("token")
        navigate("/")}}>
        로그아웃
        <img src="/arrowRight.svg" />
      </Button>
      </Buttons>
      
    </InfoWrapper>
    </Container>
  </Wrapper>
}

// import React from "react";
// import styled from "styled-components";
// import MainHeader from "../components/MainHeader";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 1600px;
//   width: 100%;
//   margin: 0 auto;
//   font-family: "Volkhov";
// `;

// const Container = styled.div`
//   width: 500px;
//   margin: 50px auto;
  
// `;

// const Section = styled.div`
//   margin-bottom: 30px;
// `;

// const Title = styled.div`
//   font-size: 40px;
//   color: #484848;
//   margin-bottom: 20px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 15px 20px;
//   border: 1px solid #8a8a8a;

//   font-size: 14px;
//   margin-bottom: 15px;
//   font-family: "Poppins";
//   box-sizing: border-box;
// `;

// const InputRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 15px;
// `;

// const HalfWidthInput = styled(Input)`
//   width: 48%;
// `;

// const Select = styled.select`
//   width: 100%;
//   border: 1px solid #8a8a8a;
//   font-size: 14px;
//   margin-bottom: 15px;
//   font-family: "Poppins";
//   padding: 15px 20px;
// `;

// const CheckboxWrapper = styled.div`
//   display: flex;
//   align-items: center;

// `;

// const Checkbox = styled.input`
//   margin-right: 10px;
//   margin-left: 0;
//   width: 20px; height: 20px; accent-color: #333;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   font-family: "Poppins";
// `;

// const CustomCheckbox = styled.input.attrs({ type: "checkbox"})`
//     width: 20px;
//   height: 20px;
//   margin-right: 10px;
//     margin-left: 0;
//   appearance: none;
//   border: 2px solid #000;

//   cursor: pointer;
//   position: relative;

//   &:checked {
//     background-color: #000;
//   }
//   &:checked::after {
//     content: '';
//     display: block;
//     width: 15px;
//     height: 15px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>');
//     background-size: cover;
//   }
// `

// export default function User() {
//   return (
//     <Wrapper>
//       <MainHeader />
//       <Container>
//       <Section>
//         <Title>Contact</Title>
//         <Form>
//           <Input type="email" placeholder="Email Address" />
//         </Form>
//       </Section>
//       <Section>
//         <Title>Delivery</Title>
//         <Form>
//           <Select>
//             <option>Country / Region</option>
//           </Select>
//           <InputRow>
//             <HalfWidthInput type="text" placeholder="First Name" />
//             <HalfWidthInput type="text" placeholder="Last Name" />
//           </InputRow>
//           <Input type="text" placeholder="Address" />
//           <InputRow>
//             <HalfWidthInput type="text" placeholder="City" />
//             <HalfWidthInput type="text" placeholder="Postal Code" />
//           </InputRow>
//           <CheckboxWrapper>
//             <CustomCheckbox />
//             <Label>Save This Info For Future</Label>
//           </CheckboxWrapper>
//         </Form>
//       </Section>
//     </Container>
//     </Wrapper>
//   );
// }

// <Form>
// <FormRow>
//   <Label htmlFor="username">아이디<Required >*</Required></Label>
//   <FullWidthInput id="username" type="text" placeholder="" />
//   <RadioDescription style={{ margin: "auto 0"}}>(영문소문자/숫자, 4~16자)</RadioDescription>
// </FormRow>
// <FormRow>
//   <Label htmlFor="password">비밀번호<Required >*</Required></Label>
//   <FullWidthInput id="password" type="password" placeholder="" />
//   <RadioDescription style={{ margin: "auto 0"}}>(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)</RadioDescription>
// </FormRow>
// <FormRow>
//   <Label htmlFor="passwordConfirm">비밀번호 확인<Required >*</Required></Label>
//   <FullWidthInput id="passwordConfirm" type="password" />
// </FormRow>
// <FormRow>
//   <Label htmlFor="name">이름<Required >*</Required></Label>
//   <FullWidthInput id="name" type="text" />
// </FormRow>
// <FormRow>
//   <Label htmlFor="address">주소<Required >*</Required></Label>
//   <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column", width: "100%" }}>
//     <div style={{ display: "flex", width: "100%"}}>
//     <FullWidthInput style={{ width: "100%" }} id="address" type="text" placeholder="기본 주소" />
//     <Button style={{ minWidth: 100}}>주소검색</Button>
//     </div>
//     <div style={{ display: "flex" , width: "100%"}}>
//     <FullWidthInput style={{ width: "100%", marginTop: 0}} id="addressDetail" type="text" placeholder="나머지 주소" />
//     </div>
    
//   </div>
// </FormRow>
// <FormRow>
//   <Label htmlFor="addressDetail"></Label>
  
// </FormRow>
// <FormRow>
//   <Label htmlFor="phone">일반전화</Label>
//   <div style={{ display: 'flex', width: "100%", alignItems: 'center' }}>
//     <HalfInput id="phone1" type="text" />
//     <span>-</span>
//     <HalfInput id="phone2" type="text" />
//     <span>-</span>
//     <HalfInput id="phone3" type="text" />
//   </div>
// </FormRow>
// <FormRow>
//   <Label htmlFor="mobile">휴대전화<Required >*</Required></Label>
//   <div style={{ display: 'flex', alignItems: 'center', width: "100%", }}>
//     <HalfInput id="mobile1" type="text" />
//     <span>-</span>
//     <HalfInput id="mobile2" type="text" />
//     <span>-</span>
//     <HalfInput id="mobile3" type="text" />
//   </div>
// </FormRow>
// <FormRow style={{ justifyContent: "left" }}>
//   <Label>SMS 수신여부</Label>
//   <RadioWrapper>
//     <div style={{ display: "flex"}}>
//     <RadioLabel>
//       <input type="radio" name="sms" value="yes" /> 수신함
//     </RadioLabel>
//     <RadioLabel>
//       <input type="radio" name="sms" value="no"  checked/> 수신안함
//     </RadioLabel>
//     </div>
    
//     <RadioDescription>쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.</RadioDescription>
//   </RadioWrapper>
  
// </FormRow>
// <FormRow>
//   <Label htmlFor="email">이메일<Required >*</Required></Label>
//   <FullWidthInput id="email" type="email" />
// </FormRow>
// <FormRow style={{ justifyContent: "left" }}>
//   <Label>이메일 수신여부</Label>
//   <RadioWrapper>
//     <div style={{ display: "flex"}}>
//     <RadioLabel>
//       <input type="radio" name="emailReceive" value="yes" /> 수신함
//     </RadioLabel>
//     <RadioLabel>
//       <input type="radio" name="emailReceive" value="no" checked /> 수신안함
//     </RadioLabel>
//     </div>
    
//     <RadioDescription>쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</RadioDescription>
//   </RadioWrapper>
  
// </FormRow>
// </Form>