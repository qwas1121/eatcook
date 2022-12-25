import React, { useEffect, useCallback, useState } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { ResultData } from "./data/resultdata";
import Slider from "react-slick";
import axios from "axios";
import KakaoShareButton from "./kakao";

import MapPop from "../map/map3";

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const food = searchParams.getAll("food");
  const [resultData, setResultData] = useState([]);

  const [ip, setIp] = useState("");

  const [isLike, setIsLike] = useState(false);
  const likePics = {
    isLike: "./img/like_btn.png",
    disLike: "./img/like_btn_g.png",
  };

  const [showPop, setShowPop] = useState(false);
  const [foodName, setFoodName] = useState();
  function popShow() {
    setShowPop(true);
  }
  const getData = (food) => {
    setFoodName(food);
  };

  const [resultNo, setResultNo] = useState();

  useEffect(() => {
    console.log(food);
    if (food == "") {
      setResultNo(true);
    } else {
      setResultNo(false);
    }
    console.log("result??", resultNo);
    const result = ResultData.filter((x, i) => {
      for (var i in food) {
        if (x.name === food[i]) {
          return x.name;
        }
      }
    });

    setResultData(result);
    axios
      .get(`http://localhost:3001/like/${food}`)
      .then((response) => {
        //console.log("data : ", response.data.foodFind);
        // setTest({ test: response.data.foodFind });
        const _resultData = response.data.foodFind.map((rowData) => ({
          name: rowData.name,
          like: rowData.like,
          likeOn: rowData.likeOn,
          isLike: rowData.isLike,
        }));

        const _ip = response.data.foodFind.map((rowData) => ({
          likeOn: rowData.likeOn,
        }));

        // console.log("test", response.data.foodFind);
        // console.log(response.data.foodFind);
        // console.log("data : ", _ip);
        setResultData(resultData.concat(_resultData));
      })
      .catch((err) => {
        console.log("다시 체크해주세요!");
      });
    //console.log("like?", isLike);
    axios
      .get("http://127.0.0.1:3001/ipCheck")
      .then((response) => {
        // console.log(response.data);
        setIp(response.data.ip);
        // console.log("A:", response.data.ip);
      })
      .catch((err) => {
        console.log("ip 확인 실패!");
      });

    // console.log(resultData);

    // console.log("좋아요체크:", isLike);
  }, [resultData.like, resultNo]);

  const slider = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // 좋아요

  function LikeBtn(aa, bb, cc) {
    //console.log(ip);
    // console.log(isLike);
    if (!cc) {
      setIsLike((cc) => true);
      setResultData(
        resultData.map((it) =>
          it.name === aa ? { ...it, like: bb + 1, isLike: true } : it
        )
      );
      axios
        .post(`http://localhost:3001/like/${aa}`, {
          like: bb + 1,
          ip: ip,
          isLike: true,
        })
        .then((response) => {
          // console.log(response);
          //window.location.reload(); // 화면을 새로고침 한다.
        })
        .catch((err) => {
          console.log("좋아요 오류!");
        });
    } else {
      setIsLike((cc) => false);
      setResultData(
        resultData.map((it) =>
          it.name === aa ? { ...it, like: bb - 1, isLike: false } : it
        )
      );
      axios
        .post(`http://localhost:3001/like/${aa}`, {
          like: bb - 1,
          ip: ip,
          isLike: false,
        })
        .then((response) => {
          // console.log(response);
          //window.location.reload(); // 화면을 새로고침 한다.
        })
        .catch((err) => {
          console.log("좋아요 오류!");
        });
    }
  }
  /*
  function reLoad() {
    axios
      .get(`http://localhost:3001/like/${food}`)
      .then((response) => {
        //setResultData(resultData.concat(_resultData));
        setResultData(response.data.foodFind);
        console.log(resultData);
      })
      .catch((err) => {
        console.log("좋아요 리로드 오류!");
      });
  }
  */

  function gotoList() {
    navigate({
      pathname: "/map3",
      search: `?${createSearchParams({
        food: food,
      })}`,
    });
  }

  return (
    <>
      <div id="sub_wrap">
        {resultNo ? (
          <div className="resultNo">
            <p>결과가 없습니다</p>
            <button onClick={() => navigate("/question")}>
              <img src="./img/restart_btn.png" alt="다시하기" />
            </button>
          </div>
        ) : (
          <div className="result_inner">
            <div className="slider_wrap">
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="prev_btn slider_btn"
              >
                <img src="./img/slider_prev.png" alt="prev" />
              </button>
              <button
                onClick={() => slider?.current?.slickNext()}
                className="next_btn slider_btn"
              >
                <img src="./img/slider_next.png" alt="prev" />
              </button>
              <Slider ref={slider} {...settings}>
                {resultData.map((ele) => (
                  <div key={ele.name} className="food_list">
                    <div className="food_list_inner">
                      <img
                        src="./img/food_img.png"
                        alt=""
                        className="foodImg"
                      />
                      <div className="text_wrap">
                        <p className="food_title">“{ele.name}”</p>
                        <p className="food_text">{ele.text}</p>
                        <img src={ele.foodImg} alt="" />
                      </div>
                      <div className="btn_list">
                        <button
                          onClick={() => {
                            LikeBtn(ele.name, ele.like, ele.isLike);
                          }}
                        >
                          {/* {console.log("좋야요?", ele.isLike)} */}
                          {ele.isLike ? (
                            <img src={likePics.isLike} />
                          ) : (
                            <img src={likePics.disLike} />
                          )}
                        </button>
                        {ele.like}
                      </div>
                    </div>
                    <div className="food_shadow"></div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="bt_btn">
              <KakaoShareButton food={food} />
              <button onClick={() => navigate("/question")}>
                <img src="./img/restart_btn.png" alt="다시하기" />
              </button>
            </div>
            <div className="bt_btn2">
              {/* <button onClick={gotoList}>내 주변 맛집 리스트 보러가기</button> */}
              <button onClick={popShow}>내 주변 맛집 리스트 보러가기</button>
            </div>
          </div>
        )}
      </div>

      <button
        className={"black_bg" + (showPop ? " show" : "")}
        onClick={() => setShowPop(false)}
      />

      {showPop ? <MapPop setShowPop={setShowPop} getData={getData} /> : null}
    </>
  );
};

export default Result;
