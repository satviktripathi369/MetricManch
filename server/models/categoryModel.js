const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  link: String,
  current_price: Number,
  original_price: Number,
  discounted: Boolean,
  thumbnail: String,
  query_url: String
});

const categorySchema = new mongoose.Schema({
  category: String,
  fetch_from: String,
  result: [productSchema]
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
