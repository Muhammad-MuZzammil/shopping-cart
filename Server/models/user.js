const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const userModel = mongoose.model("user", userSchema);

// const complexOptions = {
//   min: 5,
//   max: 255,
//   lowerCase: 1,
//   upperCase: 1,
//   numeric: 1,
//   symbol: 1,
// //   requirementCount: 2
// };

function validateUser(user) {
  let schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(50),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(50)
    // password: new passwordComplexity(complexOptions)
  };
  return Joi.validate(user, schema);
}

exports.UserModel = userModel;
exports.validate = validateUser;
