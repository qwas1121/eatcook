import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    // useHistory
    navigate("/question");
  };

  return (
    <Wrapper>
      <Header>헤더입니다.</Header>
      <Title>제목</Title>
      <Button onClick={handleClickButton}>테스트 시작</Button>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
    width  100%;
    height: 100vh;
    `;

const Header = styled.div`
  font-size: 40pt;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div``;
