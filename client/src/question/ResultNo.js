import React, { useEffect, useState } from "react";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { ResultData } from "./data/resultdata";

const ResultNo = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [foodList, setFoodList] = useState();

  useEffect(() => {
    // console.log(state);
    const newScore = ResultData.filter((s) => s.contents.includes(state));
    //console.log(newScore);
    // var num = 0;
    // var newnum = [];
    // while (num < 4) {
    //   var movenum = newScore.splice(
    //     Math.floor(Math.random() * newScore.length),
    //     num++
    //   )[0];
    //   newnum.push(movenum);
    // }
    // console.log(newnum);

    var newnum = [];

    for (var i = 0; i < 3; i++) {
      var movenum = newScore.splice(
        Math.floor(Math.random() * newScore.length),
        1
      )[0];
      newnum.push(movenum);
    }
    //console.log(newnum);
    setFoodList(newnum);
  }, []);

  function goResult() {
    const food = foodList
      .sort((a, b) => (a.score > b.score ? -1 : 1))
      .map((item) => item.name);

    navigate({
      pathname: "/result",
      search: `?${createSearchParams({
        food: food,
      })}`,
    });
  }
  return (
    <>
      <div id="sub_wrap">
        <div className="result_inner resultNo_inner">
          <div className="slider_wrap">
            <div className="food_list">
              <div className="food_list_inner">
                <div className="text_wrap">
                  <p className="no_title">“선택하신 종류의 음식이 없네요 .”</p>
                  <p className="no_text">
                    선택해주신 음식의 종류를
                    <br />
                    종합하지 못했어요...
                    <br />
                    Eatcook에서 추천해드리는 음식은 어떠신가요!?
                  </p>
                </div>
                <div className="no_btn_wrap">
                  <div className="bt_btn2">
                    <button onClick={goResult}>
                      “Eatcook”의 추천 음식 보기
                    </button>
                  </div>
                  <div className="bt_btn">
                    <button onClick={() => navigate("/question")}>
                      <img src="./img/restart_btn.png" alt="다시하기" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="food_shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultNo;
