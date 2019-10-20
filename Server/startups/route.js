const express = require("express");
const products = require("../routes/products");
const category = require("../routes/category");
const user = require("../routes/user");
const auth = require('../routes/auth')
const error = require("../middleware/errors");

module.exports = function(app) {
  app.use("/api/products", products);
  app.use("/api/category", category);
  app.use("/api/register", user);
  app.use('/api/auth',auth)
  app.use(error);
};
