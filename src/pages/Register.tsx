import React, { useState } from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

const Form = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  position: relative;
`;

const FormTitle = styled.div`
  font-family: "Volkhov";
  font-weight: 500;
  font-size: 26px;
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 54px;
  margin-top: 30px;
`;

const OAuthButton = styled.div`
  width: 100%;
  cursor: pointer;
  border: 1px solid #5b86e5;
  border-radius: 8px;
  display: flex;
  font-family: "Poppins";
  padding: 8px 30px;
  text-align: center;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  letter-spacing: 1px;

  img {
    width: 30px;
    height: 30px;
  }
`;

const Divider = styled.div`
  display: flex;
  margin: 70px auto;
  align-items: center;
  gap: 15px;
`;

const DividerLine = styled.div`
  width: 25px;
  height: 4px;
  background: #838383;
`;

const DividerText = styled.div`
  font-family: "Poppins";
  font-size: 28px;
  font-weight: bold;
  color: #838383;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 20px;
`;
const Input = styled.input`
  all: unset;
  font-family: "Poppins";
  border-bottom: 1px solid #9d9d9d;
  width: 100%;
  padding: 7px 0;
  margin-bottom: 20px;
  font-size: 15px;
  letter-spacing: 1px;

  ::placeholder {
    color: #9d9d9d;
  }
`;

const Confirm = styled.div`
  background: #000;
  border-radius: 8px;
  color: #fff;
  width: 90%;
  padding: 12px 0;
  font-family: "Poppins";
  text-align: center;
  font-weight: 600;
  margin: 20px auto;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const LogWrap = styled.div`
  display: flex;
  gap: 3px;
  font-size: 15px;
  letter-spacing: 1px;
  align-items: center;
  margin: 20px auto;
`;
const Login = styled.div`
  color: #5b86e5;
  font-family: "Poppins";
  width: fit-content;

  cursor: pointer;
`;
export default function Register() {
  const [info, setInfo] = useState<any>({})
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log(info);
    

    const payload = {
      "id": info.id,
      "password": info.password,
      "verifyPassword": info.verifyPassword,
      "email": info.email,
      "phone": info.phone,
      "name": info.name
    }

    try {
      const res = await axios.post(`http://localhost:8080/member/join`, payload, { 
        headers: {
          Accept: "*/*"
        }
      })

      alert("회원가입에 성공했습니다.");
      navigate("/login");
    }catch(e: any) {
      alert(e.response.data.errorMessage);
    }
  }
  
  return (
    <Wrapper>
      <MainHeader />
      <Form>
        <FormTitle>Sign Up</FormTitle>
        <Inputs>
          <Input placeholder="ID" onChange={(e) => setInfo({...info, id: e.target.value})}/>
          <Input placeholder="Name" onChange={(e) => setInfo({...info, name: e.target.value})}/>
          <Input placeholder="Email Address" onChange={(e) => setInfo({...info, email: e.target.value})}/>
          <Input placeholder="Phone Number" onChange={(e) => setInfo({...info, phone: e.target.value})}/>
          <Input placeholder="Password" type="password" onChange={(e) => setInfo({...info, password: e.target.value})}/>
          <Input placeholder="Confirm Password" type="password" onChange={(e) => setInfo({...info, verifyPassword: e.target.value})}/>
        </Inputs>

        <Confirm onClick={handleRegister}>Create Account</Confirm>

        <LogWrap>
          Already have an account?
          <Login onClick={() => navigate("/login")}>Login</Login>
        </LogWrap>
      </Form>
    </Wrapper>
  );
}
