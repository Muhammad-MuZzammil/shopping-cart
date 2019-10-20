const express = require("express");
const router = express.Router();
const { validate, UserModel } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const user = await UserModel.findOne({ email: req.user.email }).select(
    "email"
  );
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  console.log("saad",user)

  res.send(user);
});

router.post("/", async (req, res) => {
  // register user
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  //   user = new UserModel({ //this approach is good but we'll prefer lodash
  //       name:req.body.name,
  //       email:req.body.email,
  //       password:req.body.password,

  //   })

  user = new UserModel(_.pick(req.body, ["name", "email", "password"]));

  const token = user.generateAuthToken();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.token = token; // if u want to save token in DB
  res.status =200
  await user.save();

  //   res.send({ //this approach is good but we'll prefer lodash
  //     name: user.name,
  //     email: user.email
  //   });

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "password", "token"]));
});

module.exports = router;
