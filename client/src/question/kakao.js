import React, { useEffect } from "react";

const KakaoShareButton = ({ food }) => {
  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    // if (food === undefined) {
    //   var description =
    //     "이 음식 어때?" + "#" + food[0] + "#" + food[1] + "#" + food[2];
    // } else {
    //   var description = "좋아하는 음식 찾아보자!";
    // }
    var description =
      "이 음식 어때?" + "#" + food[0] + "#" + food[1] + "#" + food[2];
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAOMAP_API_KEY);
      }

      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "EatCook",

          description: description,

          imageUrl: "https://www.eatcook.today/img/kakao.jpg", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        // social: {
        //   likeCount: 77,
        //   commentCount: 55,
        //   sharedCount: 333,
        // },
        buttons: [
          {
            title: "지금 바로 확인하기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <button id="kakao-link-btn">
      <img src="./img/share_btn.png" alt="공유하기" />
    </button>
  );
};

export default KakaoShareButton;
