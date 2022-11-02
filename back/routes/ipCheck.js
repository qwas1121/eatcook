var express = require("express");
var router = express.Router();
var requestIp = require("request-ip");

router.get("/", function (req, res, next) {
  // res.send("ipCheck page");
  var ip = requestIp.getClientIp(req);
  console.log("client IP: " + ip);

  // ip.save();
  return res.send({ ip });
});

module.exports = router;
