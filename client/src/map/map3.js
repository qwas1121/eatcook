/* global kakao */
import React, { useEffect, useState } from "react";
import "./map2.css";
import axios from "axios";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import Slider from "react-slick";

const { kakao } = window;

const MapTest = (props) => {
  const [cityName, setCityName] = useState("");

  const [locationObj, setLocationObj] = useState({});

  const [geolocation, setGeolocation] = useState({
    lat: null,
    long: null,
  });

  const [searchParams] = useSearchParams();
  const food = searchParams.getAll("food");
  const [test, setTest] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  function getLocation() {
    let lat, long;
    if (navigator.geolocation) {
      // 위치 권한을 허용하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          setGeolocation((geolocation) => {
            return {
              ...geolocation,
              lat,
              long,
            };
          });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("위치 설정을 허용해주세요!");
      return;
    }
  }
  //슬라이더
  const slider = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (previous, next) => setTest(food[currentSlide]),
  };

  //처음 지도 그리기
  useEffect(() => {
    Map();
    console.log(test);
  }, [cityName, test]);

  const Map = () => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
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
            if (res.status === 200) {
              setLocationObj({
                si: location.address.region_1depth_name,
                gu: location.address.region_2depth_name,
                dong: location.address.region_3depth_name,
                // locationX: location.address.x,
                // locationY: location.address.y,
              });

              setCityName(
                locationObj.si + ` ` + locationObj.gu + ` ` + locationObj.dong
              );
            }
          });
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

    //검색
    var markers = [];
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    placesSearchCB();
    ps.keywordSearch(cityName + test, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        //alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  };

  return (
    <>
      <div id="map_container">
        <div className="cont_inner">
          <div className="title_wrap cf">
            <h1>What eat today</h1>
            <p>
              <span>
                <img src="./map_img/location_icon.png" alt="" />
              </span>
              {cityName}
            </p>
          </div>

          <div id="map_cont" className="cf">
            <div id="food_list">
              <Slider
                ref={slider}
                {...settings}
                initialSlide={0}
                beforeChange={(slide) => setCurrentSlide(slide)}
              >
                {food.map((ele) => (
                  <div key={ele}>{ele}</div>
                ))}
              </Slider>
            </div>
            <div id="map"></div>
            {/* <button onClick={placesSearchCB}>테스트</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapTest;
