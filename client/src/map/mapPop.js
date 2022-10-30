import React, { useState, useEffect, useRef } from "react";
import ImageMapper from "react-img-mapper";
import MapJson from "./map.json";
import "./map.css";
import areaSelect from "./area_select.json";

import Select from "react-select";

const inputs = areaSelect;

function MapPop(props, getData, setSelectmap) {
  const myRef = useRef(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [images, setImages] = useState("/map_img/map_img.png");

  // 선택시 내용 저장되게
  const [selectName, setSelectName] = useState("");

  const map = {
    name: "my-map",
    areas: MapJson,
  };

  function getTipPosition(area) {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  }

  function enterArea(area) {
    setHoveredArea(area);
  }
  function leaveArea() {
    setHoveredArea(null);
  }

  const clicked = (area, i, e) => {
    setImages(`${area.src}`);

    // 초기화 하는 코드
    // myRef.current.clearHighlightedArea();
    setSelectName(area.name);
    setChoosen(area.name);
  };

  //select
  const [choosen, setChoosen] = useState();

  const [guselect, SetGuSelect] = useState();
  const [dongselect, SetDongSelect] = useState();

  const selectChange = (e) => {
    setChoosen(e.target.value);
  };

  const selectGu = (e) => {
    //SetGuSelect(e.target.value);

    const value = e.value;
    SetGuSelect(value);
  };

  const selectDong = (e) => {
    const value = e.value;
    SetDongSelect(value);
  };

  const options = inputs.gu[choosen]?.map((o, index) => {
    return {
      label: o,
      value: o,
      key: index,
    };
  });

  const dongOptions = inputs.dong[guselect]?.map((o, index) => {
    return {
      label: o,
      value: o,
      key: index,
    };
  });

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 15,
      height: 30,
      lineHeight: "30px",
      letterSpacing: 0.25,
      color: state.isSelected ? "#81B747" : "#4A4D4D",

      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#fff",
        color: "#1f392a",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: "0",
      boxShadow: undefined,
      boxSizing: "border-box",
      border: "#4A4D4D 2px solid",
      borderTop: 0,
      marginTop: 0,
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
    control: (provided, state) => ({
      ...provided,

      height: 30,
      backgroundColor: state.isFocused ? "#1f392a" : "#fff",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.36) !important",
      borderRadius: 0,

      padding: state.isFocused ? "0 5px" : "0 5px",
      boxShadow: undefined,
      color: state.isFocused ? "#fff" : "#1f392a",
      boxSizing: "border-box",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      width: 0,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#4A4D4D",
      padding: 0,
      "&>svg": {
        width: "24px",
        height: "24px",
        color: state.isFocused ? "#fff" : "#1f392a",
      },
      "&:hover": {
        color: "#4A4D4D",
      },
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
    }),
    input: (provided, state) => ({
      ...provided,
      fontSize: 15,
      letterSpacing: 0.25,
      lineHeight: "24px",
      color: "#000000",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: 15,
      letterSpacing: 0.25,
      lineHeight: "24px",
      color: "#B9B9B9",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: 15,
      letterSpacing: 0.25,
      lineHeight: "24px",
      color: "#000000",
    }),
  };

  // check button

  function check() {
    //props.setCityName(selectName + ` ` + guselect + ` ` + dongselect);
    props.setShowPop(false);
    // console.log(selectName + ` ` + guselect + ` ` + dongselect);
    // setCityName(`${guselect}` + `${guselect}`);

    //console.log(cityName);

    if (
      selectName !== undefined &&
      guselect !== undefined &&
      dongselect !== undefined
    ) {
      props.getData(selectName + ` ` + guselect + ` ` + dongselect);
    } else if (
      selectName !== undefined &&
      guselect !== undefined &&
      dongselect === undefined
    ) {
      props.getData(selectName + ` ` + guselect);
    } else {
      props.getData(selectName);
    }

    // props.setSelectmap(selectName);
  }

  return (
    <>
      <div id="map_pop">
        <div id="map_search">
          <h3>지금 현 위치를 정해주세요.</h3>
          <div className="map_wrapper cf">
            <div className="map_img">
              <ImageMapper
                containerRef={myRef}
                src={images}
                map={map}
                width={222}
                stayMultiHighlighted
                onClick={clicked}
                onMouseEnter={(area) => enterArea(area)}
                onMouseLeave={() => leaveArea()}
              />

              {hoveredArea && (
                <div
                  className="tooltip"
                  style={{ ...getTipPosition(hoveredArea) }}
                >
                  <span>{hoveredArea && hoveredArea.name}</span>
                </div>
              )}
            </div>

            <div className="select_wrap">
              <div onChange={selectChange} value={selectName}>
                {selectName === "" ? (
                  <p className="city_text">위치를 선택해주세요.</p>
                ) : (
                  <p className="city_text">
                    <span>{selectName}</span>의<br />
                    세부 주소를 선택해주세요.
                  </p>
                )}
              </div>
              <div>
                {/*<select id="" disabled={!choosen}>
                <option value="구" selected disabled>
                  구
                </option>
                {inputs.gu[choosen]?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}

              </select>
                */}

                <div className={!choosen ? "none" : "block"}>
                  <Select
                    options={options}
                    placeholder="구 선택"
                    styles={styles}
                    onChange={selectGu}
                  />
                </div>

                <div className={!guselect ? "none" : "block selectMargin"}>
                  <Select
                    options={dongOptions}
                    placeholder="동 선택"
                    styles={styles}
                    onChange={selectDong}
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="chk_btn" onClick={check}>
            Check
          </button>
        </div>
      </div>
    </>
  );
}

export default MapPop;
