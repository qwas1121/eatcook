var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { User } = require("./models/User");

const MONGO_URI =
  "mongodb+srv://admin:DVVBJ3EmNYZQdYbm@eatcookdb.uzviiqa.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    //await mongoose.connect(MONGO_URI, {
    //  useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("MongoDB connected");

    /* GET home page. */
    router.get("/", async (req, res) => {
      try {
        const users = await User.find({});
        return res.send({ users: users });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    router.get("/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const user = await User.findOne({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    router.post("/", async (req, res) => {
      try {
        let { username, name } = req.body;
        if (!username)
          return res.status(400).send({ err: "username is required" });
        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: "Both first and last names are required" });
        const user = new User(req.body);
        await user.save();
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    router.delete("/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const user = await User.findOneAndDelete({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    router.put("/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const { age, name } = req.body;
        if (!age && !name)
          return res.status(400).send({ err: "age or name is required" });
        if (typeof age !== "number")
          return res.status(400).send({ err: "age must be a number" });
        if (
          name &&
          typeof name.first !== "string" &&
          typeof name.last !== "string"
        )
          return res
            .status(400)
            .send({ err: "first and last name are strings" });

        // let updateBody = {};
        // if (age) updateBody.age = age;
        // if (name) updateBody.name = name;

        //const user = await User.findByIdAndUpdate(userId,{ $set: { age } }, { new: true } );
        let user = await User.findById(userId);
        console.log({ userBeforeEdit: user });
        if (age) user.age = age;
        if (name) user.name = name;
        console.log({ userAfterEdit: user });
        await user.save();
        return res.send({ user });
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
