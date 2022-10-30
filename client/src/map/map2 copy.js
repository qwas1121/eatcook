/* global kakao */
import React, { useEffect, useState } from "react";
import "./map.css";
import MapPop from "./mapPop";

const { kakao } = window;

const MapTest = (props) => {
  const [map, setMap] = useState(null);
  const [showPop, setShowPop] = useState(false);

  const [cityName, setCityName] = useState("");

  function popShow() {
    setShowPop(true);
  }

  function CityName() {
    setCityName();
  }

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  const getData = (cityName) => {
    console.log("지역" + cityName);
    setCityName(cityName);
  };

  return (
    <>
      <div id="map_container">
        <div className="map_inner">
          <div className="map_title">
            <h1>Please set the current location.</h1>
            <p>현재 위치를 설정해 주세요.</p>
          </div>

          <div id="map_cont">
            <div id="map"></div>
            <button
              id="map_blur"
              onClick={popShow}
              className={cityName === "" ? "block" : "none"}
            ></button>
          </div>

          <div className="cityname">
            <p>
              <span>
                <img src="./map_img/location_icon.png" alt="" />
              </span>
              {cityName}
            </p>
          </div>
        </div>
      </div>

      {showPop ? <MapPop setShowPop={setShowPop} getData={getData} /> : null}
    </>
  );
};

export default MapTest;
