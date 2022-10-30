import React from "react";
import "./style.css";
import { QuestionData } from "./data/questiondata.js";
import { ResultData } from "./data/resultdata";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Steps } from "antd";
const { Step } = Steps;

const Question = () => {
  const [questionNo, setQuestionNo] = useState(0);

  const navigate = useNavigate();
  const [totalScore, setTotalScore] = useState([]);

  const [subQ, setSubQ] = useState("");

  useEffect(() => {
    setTotalScore(ResultData);
  }, []);

  const handleClickButton = (no, type) => {
    const newScore = totalScore.filter((s) => s.contents.includes(type));

    setTotalScore(newScore);
    setSubQ(type);

    if (QuestionData.length !== questionNo + 1) {
      if (QuestionData[questionNo].subquestion === false) {
        setQuestionNo(questionNo + 1);
      } else {
        setQuestionNo(questionNo + 0);
        // console.log(subOn);

        if (type === "육류") {
          setQuestionNo(questionNo + 1);
        } else {
          setQuestionNo(questionNo + 2);
        }
      }

      //setQuestionNo(questionNo + 1);
    } else {
      // food 도출
      //const food = newScore.map((a) => (a.score === 2 ? a.name : ""));

      const test = newScore
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .map((item) => item.name);

      console.log("newscore :", newScore);
      // console.log(" food", food);

      const food = test;

      // 결과페이지 이동
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          food: food,
        })}`,
      });
    }
  };

  return (
    <div id="sub_wrap">
      <div className="question_inner">
        <div className="question_title">
          <h2>Please choose the one you want.</h2>
          <p>선택지중 원하시는걸 선택해주세요.</p>
        </div>
        <div className="question_list cf">
          <button
            onClick={() =>
              handleClickButton(1, QuestionData[questionNo].answera)
            }
          >
            <div className="btn_inner">
              <img src="./img/main_btn_arrow.png" alt="" className="arrow" />
              <div className="img_wrap">
                <img src={QuestionData[questionNo].imagea} alt="" />
              </div>
              <p>“{QuestionData[questionNo].answera}”</p>
            </div>
          </button>

          <button
            onClick={() => {
              handleClickButton(1, QuestionData[questionNo].answerb);
            }}
          >
            <div className="btn_inner">
              <img src="./img/main_btn_arrow.png" alt="" className="arrow" />
              <div className="img_wrap">
                <img src={QuestionData[questionNo].imageb} alt="" />
              </div>
              <p>“{QuestionData[questionNo].answerb}”</p>
            </div>
          </button>

          {QuestionData[questionNo].answerc === null ? (
            ""
          ) : (
            <button
              onClick={() =>
                handleClickButton(1, QuestionData[questionNo].answerc)
              }
            >
              <div className="btn_inner">
                <img src="./img/main_btn_arrow.png" alt="" className="arrow" />
                <div className="img_wrap">
                  <img src={QuestionData[questionNo].imagec} alt="" />
                </div>
                <p>“{QuestionData[questionNo].answerc}”</p>
              </div>
            </button>
          )}
        </div>
        <div className="question_dots">
          <Steps progressDot current={questionNo}>
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
          </Steps>
        </div>
      </div>
    </div>
  );
};

export default Question;
