// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   link: String,
//   current_price: [Number],
//   original_price: Number,
//   discounted: Boolean,
//   thumbnail: String,
//   query_url: String,
//   time: [String] ,
// });

// const categorySchema = new mongoose.Schema({
//   category: String,
//   fetch_from: String,
//   result: [productSchema]
// });

// // Extract function to parse query URL
// function extractQueryURL(queryURL) {
//   const regex = /localhost:3000\/(.+)/;
//   const match = queryURL.match(regex);
//   return match ? match[1] : ''; // Extract the relevant part
// }

// const CategoryModel = mongoose.model('Category', categorySchema);

// module.exports = CategoryModel ;


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  link: String,
  current_price: [Number],
  current_price_az:[Number],
  original_price: Number,
  discounted: Boolean,
  thumbnail: String,
  az_thumbnail : String,
  query_url: String,
  query_az_url : String,
  description : String , 
  time: [String] , // New field to store time
  time_az:[String],
  asin:String
});

const categorySchema = new mongoose.Schema({
  category: String,
  fetch_from: String,
  result: [productSchema]
});

// Extract function to parse query URL
function extractQueryURL(queryURL) {
  const regex = /localhost:3000\/(.+)/;
  const match = queryURL.match(regex);
  return match ? match[1] : ''; // Extract the relevant part
}

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel ;
