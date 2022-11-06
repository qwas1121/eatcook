var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Food } = require("./models/food");

var requestIp = require("request-ip");
const e = require("express");

const MONGO_URI =
  "mongodb+srv://admin:DVVBJ3EmNYZQdYbm@eatcookdb.uzviiqa.mongodb.net/eatcookLike?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    /* GET home page. */
    router.get("/", async (req, res) => {
      try {
        const foods = await Food.find({});
        return res.send({ foods });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    router.get("/:name", async (req, res) => {
      try {
        const { name } = req.params;
        // const foodFind = await Food.find({ name: name });

        let mongoDbQuery = {
          name: { $in: name.split(",") },
        };

        const foodFind = await Food.find(mongoDbQuery);
        return res.send({ foodFind });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    //좋아요
    /*const state = { like: false, dislike: false };
    router.post("/:name", async (req, res) => {
      var IP = requestIp.getClientIp(req);
      const { name } = req.params;

      let post_list = await Food.findOne({ name: name });
      let { like } = await Food.findOne({ name: name });
      
      try {
        //console.log("=== 좋아요 시작 ===");
        //console.log(like);
        //console.log(name);

        //let query = req.query.query;
        query = req.body.like;

        // like = like + 1;
        await Food.updateOne(
          { name },

          { $set: { like: query }, $addToSet: { ip: "aa" } }
          //{ $addToSet: { userId: req.body.userId } }
        );
        await Food.updateOne();
        const docToUpdate = Food.find().where("ip").in(["s"]);
        if ({ $not: docToUpdate }) {
          console.log("test");
        } else {
          console.log("22");
        }
        //       await Food.updateOne({ name }, { $set: { like } });
        console.log("좋아요 성공 !!");

        res.send({ post_list });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });
    //
    */
    //221103
    /*router.post("/:name", async (req, res) => {
      var IP = requestIp.getClientIp(req);
      const { name } = req.params;

      let post_list = await Food.findOne({ name: name });

      const ipC = await Food.exists({ ip: IP });

      const likeCheck = await Food.exists({ likeOn: IP });

      // console.log("like", likeC);
      try {
        if (!likeCheck) {
          query = req.body.like;
          await Food.updateOne(
            { name },
            {
              $set: { like: query },
              $addToSet: { likeOn: IP },
              $pull: { likeOff: IP },
            }
            //{ $addToSet: { userId: req.body.userId } }
          );
          await Food.updateOne();
          console.log("좋아요 성공 !!");
        } else {
          query = req.body.like;
          await Food.updateOne(
            { name },
            {
              $set: { like: query },
              $addToSet: { likeOff: IP },
              $pull: { likeOn: IP },
            }
            //{ $addToSet: { userId: req.body.userId } }
          );
          await Food.updateOne();
          console.log("좋아요 취소 !!");
        }
        if (!ipC) {
          console.log("no");
        }

        return res.send({ post_list });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });
    */
    router.post("/:name", async (req, res) => {
      // var IP = requestIp.getClientIp(req);

      var like = req.body.isLike;
      var likenum = req.body.like;
      //var Like = req.body.Like
      const { name } = req.params;

      let post_list = await Food.findOne({ name: name });

      const likeCheck = await Food.exists({ likeOn: IP });

      // console.log("like", likeC);
      try {
        if (!likeCheck) {
          query = req.body.like;
          var IP = req.body.ip;
          await Food.updateOne(
            { name },
            {
              $set: { like: query, isLike: like },
              $addToSet: { likeOn: IP },
              $pull: { likeOff: IP },
            }
            //{ $addToSet: { userId: req.body.userId } }
          );
          await Food.updateOne();
          console.log("좋아요 성공 !!");
        } else {
          query = req.body.like;
          var IP = req.body.ip;
          await Food.updateOne(
            { name },
            {
              $set: { like: query, isLike: like },
              $addToSet: { likeOff: IP },
              $pull: { likeOn: IP },
            }
            //{ $addToSet: { userId: req.body.userId } }
          );
          await Food.updateOne();
          console.log("좋아요 취소 !!");
        }

        return res.send({ post_list });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });
    //
  } catch (err) {
    console.log(err);
  }
};

server();
module.exports = router;
