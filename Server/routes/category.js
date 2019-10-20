const express = require("express");
const router = express.Router();
const { CategoryModel, validate } = require("../models/category");

router.get("/", async (req, res) => {
  const category = await CategoryModel.find().sort("title");
  if (!category) return res.status(404).send("Category not found");
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new CategoryModel({
    title: req.body.title
  });
  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = await CategoryModel.findById(req.params.id);
  if (category.title == req.body.title)
  return res.status(400).send("Category already exist in database");

  category.title = req.body.title;
  category.save();
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await CategoryModel.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Category not found");

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) return res.status(404).send("Category not found");

  res.send(category)
});
module.exports = router;
