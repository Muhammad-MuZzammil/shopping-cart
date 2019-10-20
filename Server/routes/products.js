const express = require("express");
const router = express.Router();
const { validate, Product } = require("../models/product");
const { CategoryModel } = require("../models/category");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" )
    cb(null, true);
  else cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", async (req, res) => {
  const product = await Product.find()
    .sort("name")
    .select("description category price productImage");

  if (!product) return res.status(404).send("Product not found");

  res.send(product);
});

router.post("/", upload.single("productImage"), async (req, res) => {
  
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await CategoryModel.findById(req.body.categoryId);
  console.log(category);
  if (!category) return res.status(404).send("Category not found");

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productImage: req.body.productImage,
    category: {
      _id: category._id,
      title: category.title
    },
  });

  await product.save();
  console.log(product);
  res.send(product);
});

module.exports = router;
