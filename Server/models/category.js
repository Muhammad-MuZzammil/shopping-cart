const mongoose = require("mongoose");
const Joi = require("joi");
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const CategoryModel = mongoose.model("category", categorySchema);

function categoryValidation(category) {
  let schema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(50),
  };
  return Joi.validate(category, schema);
}

exports.validate = categoryValidation;
exports.CategoryModel = CategoryModel;
exports.categorySchema = categorySchema;
