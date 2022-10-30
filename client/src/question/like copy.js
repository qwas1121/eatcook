import React, { useEffect, useCallback, useState, useQuery } from "react";

import axios from "axios";

function Like({ data }) {
  const [foodname, setFoodName] = useState();
  const [likenum, setLikeNum] = useState();

  /*useEffect(() => {
    axios.get("http://localhost:3001/db").then((response) => {
      console.log(response.data[0].foodname);
      setFoodName(response.data[0].foodname);
      setLikeNum(response.data[0].likenum);
    });
  }, []);
  */

  useEffect(() => {
    axios.get("http://localhost:3001/db").then((response) => {
      // console.log(response.data[0].foodname);
      setFoodName(response.data[0].foodname);
      setLikeNum(response.data[0].likenum);
    });
  }, []);

  function postData() {
    axios
      .post("http://localhost:3001/db", {
        likenum: likenum + 1,
      })
      .then(function (response) {
        console.log("1 " + response);
      })
      .catch(function (error) {
        console.log("2 " + error);
      });
  }

  return (
    <>
      <p>
        {foodname} <br /> {likenum}
      </p>
      <button onClick={postData}>테스트</button>
    </>
  );
}

export default Like;
