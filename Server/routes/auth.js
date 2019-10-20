const express = require("express");
const router = express.Router();
const { UserModel } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      msg: error.details[0].message
    });

  let user = await UserModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      msg: "Invalid email or password"
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({
      msg: "Invalid email or password"
    });

  const token = user.generateAuthToken();
  res.send({
    token: token,
    status: true,
    msg: "You're successfully login"
  });
});

function validate(req) {
  let schema = {
    email: Joi.string()
      .required()
      .min(10)
      .max(50),
    password: Joi.string()
      .required()
      .min(5)
      .max(50)
  };
  return Joi.validate(req, schema);
}

module.exports = router;
