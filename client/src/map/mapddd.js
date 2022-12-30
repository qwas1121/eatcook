/* global kakao */
import React, { useEffect, useState } from "react";
import "./map.css";
import MapPop from "./mapPop";

import axios from "axios";

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

  const searchPlace = cityName;

  const click_ref = React.useRef(null);
  const [locationObj, setLocationObj] = useState({});
  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          //displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    /* function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
    */

    function locationLoadSuccess(pos) {
      // 현재 위치 받아오기

      var lat = pos.coords.latitude, // 위도
        lon = pos.coords.longitude; // 경도

      var currentPos = new kakao.maps.LatLng(lat, lon);

      // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
      map.panTo(currentPos);

      // 마커 생성
      var marker = new kakao.maps.Marker({
        position: currentPos,
      });

      // 기존에 마커가 있다면 제거
      marker.setMap(null);
      marker.setMap(map);

      console.log(currentPos);

      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${lon}&y=${lat}`,
          {
            headers: {
              Authorization: "KakaoAK a172241280ee03c5618ac0f9ca49dd38", // REST API 키
            },
          }
        )
        .then((res) => {
          const location = res.data.documents[0];
          setLocationObj({
            si: location.address.region_1depth_name,
            gu: location.address.region_2depth_name,
            dong: location.address.region_3depth_name,
            // locationX: location.address.x,
            // locationY: location.address.y,
          });
        });

      console.log(locationObj.si + " " + locationObj.gu);
    }

    function locationLoadError(pos) {
      alert("위치 정보를 가져오는데 실패했습니다.");
    }

    // 위치 가져오기 버튼 클릭시
    function getCurrentPosBtn() {
      navigator.geolocation.getCurrentPosition(
        locationLoadSuccess,
        locationLoadError
      );
    }

    click_ref.current = getCurrentPosBtn;
  }, [searchPlace]);

  const getData = (cityName) => {
    //console.log("지역" + cityName);
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
              className={
                cityName === "" && locationObj.si === undefined
                  ? "block"
                  : "none"
              }
            ></button>
          </div>

          <div className="cityname">
            <p>
              <span>
                <img src="./map_img/location_icon.png" alt="" />
              </span>

              {locationObj.si !== undefined
                ? locationObj.si + " " + locationObj.gu
                : cityName}
            </p>
          </div>

          <button onClick={() => click_ref.current()}>내위치</button>
        </div>
      </div>

      {showPop ? <MapPop setShowPop={setShowPop} getData={getData} /> : null}
    </>
  );
};

export default MapTest;
