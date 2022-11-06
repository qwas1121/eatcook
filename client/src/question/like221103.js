import React, { useEffect, useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResultData } from "./data/resultdata";
import Slider from "react-slick";
import axios from "axios";
import KakaoShareButton from "./kakao";

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const food = searchParams.getAll("food");
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
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
        }));
        const _ip = response.data.foodFind.map((rowData) => ({
          likeOn: rowData.likeOn,
        }));
        console.log("data : ", _ip);
        setResultData(resultData.concat(_resultData));
      })
      .catch((err) => {
        console.log("다시 체크해주세요!");
      });

    axios
      .get("http://127.0.0.1:3001/ipCheck")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("ip 확인 실패!");
      });
  }, [resultData.like]);

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

  const [isLike, setIsLike] = useState(true);

  function LikeBtn(aa, bb) {
    if (isLike) {
      setIsLike(false);
      setResultData(
        resultData.map((it) => (it.name === aa ? { ...it, like: bb + 1 } : it))
      );
      axios
        .post(`http://localhost:3001/like/${aa}`, {
          like: bb + 1,
        })
        .then((response) => {
          // console.log(response);
          //window.location.reload(); // 화면을 새로고침 한다.
        })
        .catch((err) => {
          console.log("좋아요 오류!");
        });
    } else {
      setIsLike(true);
      setResultData(
        resultData.map((it) => (it.name === aa ? { ...it, like: bb - 1 } : it))
      );
      axios
        .post(`http://localhost:3001/like/${aa}`, {
          like: bb - 1,
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

  return (
    <>
      <div id="sub_wrap">
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
                  <div className="medal"></div>
                  <div className="food_list_inner">
                    <h2>How about this one?</h2>
                    <img src="./img/food_img.png" alt="" className="foodImg" />
                    <div className="text_wrap">
                      <p className="food_title">“{ele.name}”</p>
                      <p className="food_text">{ele.text}</p>
                    </div>
                    <div className="btn_list">
                      <button>
                        <img src="./img/like_btn.png" alt="좋아요" />
                      </button>

                      <button
                        onClick={() => {
                          LikeBtn(ele.name, ele.like);
                        }}
                      >
                        좋아요
                      </button>
                      {ele.like}

                      <KakaoShareButton food={food} />
                      <button onClick={() => navigate("/question")}>
                        <img src="./img/restart_btn.png" alt="다시하기" />
                      </button>
                    </div>
                  </div>
                  <div className="food_shadow"></div>
                </div>
              ))}
            </Slider>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Result;
