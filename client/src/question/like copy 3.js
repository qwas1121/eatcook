import React, { useEffect, useCallback, useState, useRef } from "react";
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
  const [test, setTest] = useState([
    {
      name: "",
      like: "",
    },
  ]);

  useEffect(() => {
    console.log("food :", food);
    axios
      .get(`http://localhost:3001/like/${food}`)
      .then((response) => {
        console.log("data : ", response.data.foodFind);
        setTest({ test: response.data.foodFind });

        const _test = response.data.foodFind.map((rowData) => ({
          name: rowData.name,
          like: rowData.like,
        }));
        setTest(test.concat(_test));
      })
      .catch((err) => {
        console.log("다시 체크해주세요!");
      });

    console.log("test : ", test);

    /* const result = test.filter((x, i) => {
      for (var i in food) {
        if (x.name === food[i]) {
          return x.name;
        }
      }
    });

    setResultData(result);
    */

    // const result = ResultData.find((s) => s.name === food[2]);

    //★★★★★★ db에서 불러온거는 like만 비교해서 가져오기★★★★★★
  }, []);

  const slider = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // 좋아요
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false);

  function LikeBtn() {
    if (!isLike) {
      setLike(like + 1);
      setIsLike(true);
    } else {
      alert("이미 좋아요를 눌렀습니다");
    }

    axios
      .post("http://localhost:3001/db", {
        likenum: like + 1,
      })
      .then(function (response) {
        console.log("1 " + response);
      })
      .catch(function (error) {
        console.log("2 " + error);
      });
  }

  const displayBlogPost = (test) => {
    return test.map((post, index) => (
      <div key={index}>
        <h3>{post.name}</h3>
        <p>{post.like}</p>
      </div>
    ));
  };

  //console.log(resultData);

  return (
    <>
      <div>{displayBlogPost(test)}</div>
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
                      <button onClick={LikeBtn}> 👍 </button> {ele.likenum}
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
