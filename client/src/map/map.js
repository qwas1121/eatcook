/* global kakao */
import React, { useEffect, useState, useCallback, useRef } from "react";
import "./map.css";
import axios from "axios";

import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import Slider from "react-slick";
import Crawling from "./crawling";
import markerA from "./img/001.png";
import markerB from "./img/002.png";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const { kakao } = window;

const MapTest = (props) => {
  const [cityName, setCityName] = useState("");

  const [cityName2, setCityName2] = useState("");

  const [locationObj, setLocationObj] = useState({});

  const [geolocation, setGeolocation] = useState({
    lat: null,
    long: null,
  });

  const [searchParams] = useSearchParams();
  const food = searchParams.getAll("food");
  const [test, setTest] = useState(food[0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  //네이버 크롤링
  const [dong, setDong] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState();
  //
  const [isText, setIsText] = useState();
  const [isClick, setIsClick] = useState(false);

  //음식점이름
  const [placeName, setPlaceName] = useState();
  //총 검색 수
  const [total, setTotal] = useState();
  //음식점주소
  const [placeAdd, setPlaceAdd] = useState();

  //슬라이드
  const slickRef2 = useRef(null);

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

  const MainPrevious = useCallback(() => slider.current.slickPrev(), []);
  const MainNext = useCallback(() => slider.current.slickNext(), []);

  const crPrevious = useCallback(() => slickRef2.current.slickPrev(), []);
  const crNext = useCallback(() => slickRef2.current.slickNext(), []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    //beforeChange: (current, next) => setTest(food[0]),
    beforeChange: (previous, next) => setTest(food[next]),
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rows: 3,
    appendDots: (dots) => (
      <>
        <div className="cr_nav">
          <div className="arrows" onClick={crPrevious}>
            <FaChevronLeft />
          </div>
          <ul>{dots}</ul>
          <div className="arrows" onClick={crNext}>
            <FaChevronRight />
          </div>
        </div>
      </>
    ),
  };

  //처음 지도 그리기
  useEffect(() => {
    Map();
    //  console.log(cityName, test);
    console.log(props.resultData);
  }, [cityName, cityName2, test, query, isText]);

  const handleButton = async (e) => {
    // console.log(e);
    try {
      const res = await axios.get("http://localhost:3001/naver/", {
        params: {
          query: e,
        },
      });
      if (res && res.status === 200) {
        const { data } = res;
        setItems(data.items);
        setTotal(data.total);
        // console.log(data.items);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };
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
              setCityName2(locationObj.si + ` ` + locationObj.gu);
              setDong(locationObj.gu);
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
    ps.keywordSearch(cityName2 + ` ` + test, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setIsText(true);
        map.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        //alert("검색 결과가 존재하지 않습니다.");
        setIsText(false);
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }
    let selectedMarker = null;
    function displayMarker(place, normalOrigin, clickOrigin) {
      var imageSrc = markerA, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(29, 42); // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      var imageSrc2 = markerB;

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var normalImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        clickImage = new kakao.maps.MarkerImage(imageSrc2, imageSize),
        markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: normalImage,
      });
      marker.normalImage = normalImage;

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div class="marker_text" style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
        if (!selectedMarker || selectedMarker !== marker) {
          // 클릭된 마커 객체가 null이 아니면
          // 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!selectedMarker &&
            selectedMarker.setImage(selectedMarker.normalImage);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(clickImage);
        }
        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        selectedMarker = marker;

        handleButton(cityName + ` ` + test + ` ` + place.place_name);
        setPlaceName(place.place_name);
        setIsClick(true);

        setPlaceAdd(place.road_address_name);
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
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
              <div className="food_arrows">
                <button onClick={MainPrevious} className="arrow_prev">
                  <img src="./img/food_prev.png" alt="" />
                </button>
                <button onClick={MainNext} className="arrow_next">
                  <img src="./img/food_next.png" alt="" />
                </button>
              </div>
              <Slider ref={slider} {...settings} initialSlide={0}>
                {props.resultData.map((ele) => (
                  <div key={ele} className="list_wrap">
                    <img src={ele.foodImg} alt="" />
                    <div className="list_text">
                      <p className="text1">“{ele.name}”</p>
                      <p className="text2">{ele.text}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div id="map" className={!isText ? "resultNo" : ""}></div>

            {/* <button onClick={placesSearchCB}>테스트</button> */}
          </div>
          <div id="crawling" className={isClick ? "isCheck" : ""}>
            <div className="checked_cr">
              <div className="place_title cf">
                <h3>{placeName}</h3>
                <div className="place_info cf">
                  <p className="txt1">{placeAdd}</p>
                  <p className="txt2">
                    블로그리뷰 <span>{total}</span>
                  </p>
                </div>
              </div>
              <Slider {...settings2} ref={slickRef2}>
                {items &&
                  items.map((item) => {
                    item.title = item.title.replace(/<b>/g, "");
                    item.title = item.title.replace(/<\/b>/g, "");
                    item.title = item.title.replace(/&apos;/g, "'");
                    item.title = item.title.replace(/&quot;/g, `"`);
                    item.title = item.title.replace(/&amp;/g, "&");
                    item.title = item.title.replace(/&lt;/g, "<");
                    item.title = item.title.replace(/&gt;/g, ">");
                    return (
                      <div key={item}>
                        <Crawling item={item}></Crawling>
                      </div>
                    );
                  })}
              </Slider>
            </div>

            <div className="before_cr">
              <div>
                <img src="./map_img/select_before_icon.png" alt="" />
                <p>원하시는 음식점을 선택해 주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapTest;
