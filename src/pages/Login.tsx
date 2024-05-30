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
  @media screen and (max-width: 600px) {
    padding: 0 20px;
    box-sizing: border-box;
  }
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
`

const Confirm = styled.div`
    background: #000;
    border-radius: 8px;
    color: #fff;
    width: 90%;
    padding: 12px 0;
    font-family: "Poppins";
    text-align: center;
    font-weight: 600;
    margin: 10px auto;
    font-size: 15px;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
`

const Register = styled.div`
    border: 1px solid #5B86E5;
    color: #5B86E5;
    border-radius: 8px;
    width: 90%;
    padding: 12px 0;
    font-family: "Poppins";
    text-align: center;
    font-weight: 600;
    margin: 10px auto;
    font-size: 15px;
    cursor: pointer;
    letter-spacing: 1px;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
`

const ForgetPassword = styled.div`
    color: #5B86E5;
    font-family: "Poppins";
    font-weight: 700;
    width: fit-content;
    font-size: 15px;
    position: absolute;
    bottom: -30px;
    right: 30px;
    letter-spacing: 1px;
    text-decoration: underline;
    cursor: pointer;
`
export default function Login() {
    const navigate = useNavigate();
  const [info, setInfo] = useState<any>({})
    const handleLogin = async () => {
      console.log(info);
      const name = `${info.firstName} ${info.lastName}`
  
      const payload = {
        "id": info.id,
        "password": info.password,
      }
  
      try {
        const res = await axios.post(`http://localhost:8080/member/login`, payload, { withCredentials: true })
        console.log(res.headers)
        localStorage.setItem("token", res.headers["x-auth-token"])
        // console.log(res.headers["x-auth-token"])
        console.log(res.data);
        alert("로그인에 성공했습니다.");
        navigate("/");
      }catch(e: any) {
        alert(e.response.data.errorMessage);
      }
    }

    
  return (
    <Wrapper>
      <MainHeader />
      <Form>
        <FormTitle>Sign In</FormTitle>
        <Input placeholder="ID"  onChange={(e)=> setInfo({...info, id: e.target.value})}/>
        <Input placeholder="Password" type="password"  onChange={(e)=> setInfo({...info, password: e.target.value})}/>
        <Confirm onClick={()=>handleLogin()}>Sign In</Confirm>
        <Register onClick={() => navigate('/register')}>Register Now</Register>
        <ForgetPassword onClick={() => navigate("/find-id")}>Forget ID?</ForgetPassword>
        <ForgetPassword onClick={() => navigate("/find-password")} style={{ bottom: -60}}>Forget Password?</ForgetPassword>
      </Form>
    </Wrapper>
  );
}
