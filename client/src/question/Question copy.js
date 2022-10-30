import React from "react";
import styled from "styled-components";
import { ProgressBar, Button, ButtonGroup } from "react-bootstrap";
import { QuestionData } from "../data/questiondata.js";
import { ResultData } from "../data/resultdata";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Question = () => {
  const [questionNo, setQuestionNo] = useState(0);

  const navigate = useNavigate();
  const [totalScore, setTotalScore] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // const [isOn, setisOn] = useState(false);

  const [subQ, setSubQ] = useState("");

  const isOn = useRef(false);

  useEffect(() => {
    setTotalScore(ResultData);
  }, []);

  const handleClickButton2 = (no, type) => {
    isOn.current = false;
    setQuestionNo(questionNo + 1);
  };

  if (QuestionData[questionNo].isOn === true) {
    //setisOn(true);
    isOn.current = true;
    console.log("dd");
  } else {
    //setisOn(false);
    isOn.current = false;
    console.log("dd2");
  }

  const handleClickButton = (no, type) => {
    const newScore = totalScore.map((s) =>
      s.contents.includes(type)
        ? { name: s.name, contents: s.contents, score: s.score + no }
        : s
    );

    //const test = subQ.map((a) => (a.subquestion.includes(type) ? a : ""));

    setTotalScore(newScore);
    setSubQ(type);

    if (QuestionData.length !== questionNo + 1) {
      console.log(isOn);
      if (isOn.current === true) {
        setShowResults(true);
      } else {
        setQuestionNo(questionNo + 1);
        setShowResults(false);
      }

      //setQuestionNo(questionNo + 1);
    } else {
      // mbti 도출
      //const mbti = newScore.map((a) => (a.score === 2 ? a.name : ""));

      const test = newScore
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .map((item) => item.name);

      console.log("newscore", newScore);
      // console.log(" mbti", mbti);

      const mbti = test.slice(undefined, 3);

      // 결과페이지 이동
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };

  const Results = (props) =>
    QuestionData[questionNo].subquestion.map((a) =>
      a.subname.includes(subQ) ? (
        <ButtonGroup>
          <>
            {questionNo}
            <Button
              key={props}
              onClick={() => {
                isOn.current = false;
                handleClickButton(1, a.answer1);
                console.log(isOn);
              }}
            >
              {a.answer1}
            </Button>
          </>
        </ButtonGroup>
      ) : (
        <></>
      )
    );

  return (
    <Wrapper>
      <ProgressBar
        striped
        variant="danger"
        now={(questionNo / QuestionData.length) * 100}
        style={{ margintop: "20px" }}
      />
      <Title>{QuestionData[questionNo].title}</Title>
      {questionNo}
      <ButtonGroup>
        <Button
          onClick={() => handleClickButton(1, QuestionData[questionNo].answera)}
        >
          {QuestionData[questionNo].answera}
        </Button>
        <Button
          onClick={() => handleClickButton(1, QuestionData[questionNo].answerb)}
        >
          {QuestionData[questionNo].answerb}
        </Button>
        <Button
          className={`
            ${QuestionData[questionNo].answerc === null ? "none" : "block"} 
          
              `}
          onClick={() => handleClickButton(1, QuestionData[questionNo].answerc)}
        >
          {QuestionData[questionNo].answerc}
        </Button>
        {showResults ? <Results /> : null}
      </ButtonGroup>
    </Wrapper>
  );
};

export default Question;

const Wrapper = styled.div``;
const Title = styled.div``;
