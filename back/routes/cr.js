var express = require("express");
var router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");
var html = "";
let movie = [];

async function getHTML() {
  try {
    console.log("getHtml");
    return await axios.get("https://place.map.kakao.com/1745533565");
  } catch (err) {
    console.log(err);
  }
}

async function parsing() {
  html = await getHTML();
  const $ = cheerio.load(html.data);
  const $rankList = $(".cont_review");

  //   const locationSearchs =
  //     "https://pcmap.place.naver.com/restaurant/37057602/review/ugc?type=photoView";
  //   const searchParams = new URLSearchParams(locationSearchs);

  //   for (const param of searchParams) {
  //     console.log("test ", param);
  //   }

  console.log($rankList.length);
  $rankList.each((idx, node) => {
    $(node)
      .find("div")
      .each((i, s) => {
        movie.push({
          title: $(s).find("div").text(),
          //image: $(s).find("img.nm-collections-title-img").attr("src"),
        });
      });
  });
  return movie;
}
parsing();
router.get("/", function (req, res, next) {
  res.send(movie);
});

module.exports = router;
