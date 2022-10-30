var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Food } = require("./models/food");

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

        // const foodFind = await Food.find({ name: name });

        const foodFind = await Food.find(mongoDbQuery);
        return res.send({ foodFind });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

server();
module.exports = router;
