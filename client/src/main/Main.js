import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

import { ReactComponent as TopSvg } from "./svg/top.svg";
import { ReactComponent as RbSvg } from "./svg/rb.svg";
import { ReactComponent as RbSvg2 } from "./svg/rb2.svg";
import { ReactComponent as LeftSvg } from "./svg/left.svg";

const Main = () => {
  const navigate = useNavigate();
  const gotoQuestion = () => {
    navigate("/question");
  };

  return (
    <>
      <div id="MainWrap">
        {/*상단*/}
        <TopSvg fill="#ffc35e" />
        {/*오른쪽하단1*/}
        <RbSvg fill="#ffdeae" />
        {/*오른쪽하단2*/}
        <RbSvg2 fill="#ffc35e" />
        {/*왼쪽*/}
        <LeftSvg fill="#e9a352" />
        <div className="leaf">
          <img src="./img/main_leaf.png" alt="" />
        </div>
        <div className="main_text">
          <h2>What eat today</h2>
          <h1>
            <img src="./img/logo.png" alt="eatcook" />
          </h1>
          <button onClick={gotoQuestion}>
            <div className="main_btn">
              <p>Early Access</p>
              <img src="./img/main_btn_arrow.png" alt="" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
export default Main;
