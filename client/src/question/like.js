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

  const [ip, setIp] = useState("");

  const [isLike, setIsLike] = useState(false);

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
          isLike: rowData.isLike,
        }));

        const _ip = response.data.foodFind.map((rowData) => ({
          likeOn: rowData.likeOn,
        }));

        console.log("test", response.data.foodFind);
        console.log(response.data.foodFind);
        console.log("data : ", _ip);
        setResultData(resultData.concat(_resultData));
      })
      .catch((err) => {
        console.log("다시 체크해주세요!");
      });
    console.log("like?", isLike);
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

    console.log(resultData);

    console.log("좋아요체크:", isLike);
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

  function LikeBtn(aa, bb, cc) {
    //console.log(ip);
    console.log(isLike);
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
                          LikeBtn(ele.name, ele.like, ele.isLike);
                        }}
                      >
                        {console.log("좋야요?", ele.isLike)}
                        {ele.isLike ? "좋아요했음" : "좋아요해줘"}
                      </button>
                      {ele.like}

                      <button onClick={() => navigate("/question")}>
                        <img src="./img/restart_btn.png" alt="다시하기" />
                      </button>
                    </div>
                  </div>
                  <div className="food_shadow"></div>
                </div>
              ))}
            </Slider>
            <KakaoShareButton food={food} />
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Result;
