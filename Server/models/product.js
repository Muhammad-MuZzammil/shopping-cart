const mongoose = require("mongoose");
const Joi = require("joi");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  productImage: {
    type: String,
    required: true
  },
  category: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  }
});

const Product = mongoose.model("product", schema);

function productValidation(product) {
  let schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(50),
    description: Joi.string()
      .required()
      .min(5)
      .max(255),
    price: Joi.string()
      .required()
      .min(0)
      .max(100),
      productImage: Joi.string()
      .required(),
    categoryId: Joi.objectId().required()
  };
  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = productValidation;
