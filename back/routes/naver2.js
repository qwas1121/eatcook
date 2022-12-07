var express = require("express");
var router = express.Router();

var https = require("https");

var CLIENT_ID = "CcwyHEwBJHEY3uLjfbyI";
var CLIENT_SECRET = "EaZ46lLLIy";
var API_URI = "/v1/search/blog.json?query=";

var options = {
  host: "openapi.naver.com",
  port: 443,
  path: API_URI,
  method: "GET",
  headers: {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET,
  },
};

router.get("/", function (req, res, next) {
  let query = req.query.query;
  var searchText = encodeURIComponent(query);
  options.path = API_URI + searchText;
  var apiReq = https.request(options, function (apiRes) {
    console.log("STATUS: " + apiRes.statusCode);
    apiRes.setEncoding("utf8");
    apiRes.on("data", function (chunk) {
      res.setHeader("Content-Type", "application/json");
      res.send(chunk);
    });
  });
  apiReq.end();
});

module.exports = router;
