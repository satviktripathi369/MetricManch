const axios = require('axios');
const Category = require('../models/categoryModel');
const categoryData = require('../data/category.json');
require('dotenv').config(); 
const FLIPKART_API=process.env.FLIPKART_API;

// Extract function to parse query URL
function extractQueryURL(queryURL) {
  const regex = /localhost:3000\/(.+)/;
  const match = queryURL.match(regex);
  return match ? match[1] : ''; // Extract the relevant part
}


// Function to get formatted today's date
function getFormattedToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let mmin = today.getMinutes();

  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;

  if (dd < 10) dd = '0' + dd;
  if (mmin < 10) mmin = '0' + mmin;

  return dd + '/' + mm + '/' + yyyy +" " +hh + ':' + mmin;;
}
class CategoryController {
  async searchAndStore(req, res) {
    try {
      const category = req.params.category;
      const categories = categoryData.field || [];

      if (categories.indexOf(category) !== -1) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      const apiUrl = `${FLIPKART_API}/search/${category}`;
      const response = await axios.get(apiUrl);
      

      // Process and format data before storing
      const formattedResult = response.data.result.map(product => ({
        ...product,
        query_url: extractQueryURL(product.query_url), // Extract query URL
        time: [getFormattedToday()], // Add current time
        current_price: [product.current_price] // Convert current price to array
      }));

      const dataToStore = {
        category: category,
        fetch_from: apiUrl,
        result: formattedResult
      };

      const categoryInstance = new Category(dataToStore);
      await categoryInstance.save();

      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      console.error('Error searching and storing data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async fetchByKey(req, res) {
    try {
      const key = req.params.key;
      const categoryData = require('../data/category.json');
      const categories = categoryData.field || [];

      if (categories.indexOf(key) !== -1) {
        return res.status(400).json({ error: 'Invalid key' });
      }

      const data = await Category.findOne({ category: key });
      if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
        

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data by key:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new CategoryController();
