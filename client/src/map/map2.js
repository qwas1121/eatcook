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

    return;
  }, [searchPlace]);
  const [locationObj, setLocationObj] = useState({});
  //내 위치
  function myLocation() {
    let mapContainer = document.getElementById("map");
    let mapOption = {
      center: new kakao.maps.LatLng(37.54450594119613, 127.06564792353285), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성 및 객체 리턴

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

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
        console.log(locationObj);

        setCityName(locationObj.si + ` ` + locationObj.gu);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(
          37.54450594119613,
          127.06564792353285
        ),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }

  const getData = (cityName) => {
    //console.log("지역" + cityName);
    setCityName(cityName);
  };

  // 위치 좌표를 텍스트로 변환

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
              <p>{locationObj.si}</p>
            </p>
          </div>

          <button onClick={myLocation}>내위치</button>

          <button
            onClick={() => {
              myLocation();
            }}
          >
            테스트
          </button>
        </div>
      </div>

      {showPop ? <MapPop setShowPop={setShowPop} getData={getData} /> : null}
    </>
  );
};

export default MapTest;
