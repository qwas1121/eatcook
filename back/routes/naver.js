// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require("express");
var router = express.Router();
var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;
router.get("/", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/blog?display=30&query=" +
    encodeURI(req.query.query); // json 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
  var request = require("request");
  var options = {
    url: api_url,
    path: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    let query = req.query.query;
    var searchText = encodeURIComponent(query);
    options.path = api_url + searchText;

    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
      // console.log(query);
      //console.log(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

module.exports = router;
