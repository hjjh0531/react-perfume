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
  font-family: "Volkhov";
  height: 100vh;
`;

const Container = styled.div`
  width: 700px;
  margin: auto;
  padding-bottom: 200px;
  @media screen and (max-width: 600px) {
    width: 90%;
    box-sizing: border-box;
  }
`;

const Title = styled.div`
  font-size: 24px;

  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    box-sizing: border-box;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  font-family: "Poppins";
  border-bottom: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  letter-spacing: 1px;
  box-sizing: border-box;
  
`;

const FullWidthInput = styled(Input)`
  width: 100%;
`;

const Button = styled.button`
  padding: 15px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Poppins";
  font-weight: 600;
  width: 90%;
  margin: 20px auto;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Link = styled.div`
  text-decoration: none;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  margin: 10px auto;
  width: fit-content;
  font-family: "Poppins";
  display: flex;
  gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export default function FindId() {
  const navigate = useNavigate();

  const [info, setInfo] = useState<any>({})
    const handleFindPassword = async () => {      
      console.log(info);
      try {
        const res = await axios.post(`http://localhost:8080/member/find-id`, info)

        alert(`아이디는 ${res.data} 입니다.`);
        console.log(res.data);
      }catch(e: any) {
        alert(e.response.data.errorMessage);
      }
    }

    
  return (
    <Wrapper>
      <MainHeader />
      <Container>
        <Title>Forget ID</Title>
        <Form>
          <InputRow>
            <FullWidthInput type="name" placeholder="Name" onChange={(e) => setInfo({ ...info, name: e.target.value})}/>
            <FullWidthInput type="text" placeholder="Email" onChange={(e) => setInfo({ ...info, email: e.target.value})}/>
          </InputRow>

          <Button onClick={() => handleFindPassword()}>Send Confirmation Code</Button>
        </Form>
        <Link onClick={() => navigate("/login")}>
          Already have an account? <div style={{ color: "#5B86E5" }}>Login</div>
        </Link>
      </Container>
    </Wrapper>
  );
}
