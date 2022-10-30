import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResultData } from "./data/resultdata";

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const food = searchParams.getAll("food");
  const [resultData, setResultData] = React.useState([]);

  useEffect(() => {
    // const result = ResultData.find((s) => s.name === food[2]);
    const result = ResultData.filter((x, idx) => x.name === food[idx]);
    setResultData(result);
  }, []);

  // ["exuberant", "destruction", "present"]

  //console.log("결과1", food);
  //console.log("결과2", resultData);
  // React.useEffect(() => {
  //   // window.location.reload();
  // }, [food]);

  return (
    <>
      <div id="sub_wrap">
        <div className="result_inner">
          <Desc>음식 이름 : {food}</Desc>
          음식이름2
          {resultData.map((ele) => (
            <p key="{ele}">
              {ele.name} {ele.text}
            </p>
          ))}
          {/* <ShareButtonGroup>
            <div className="addthis_inline_share_toolbox" />
          </ShareButtonGroup> */}
          <div>
            <Button
              onClick={() => navigate("/")}
              className="btn-danger"
              style={{
                width: 170,
                fontFamily: "SimKyungha",
                fontSize: 25,
                marginTop: 20,
              }}
            >
              테스트 다시하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

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

const Desc = styled.div``;
