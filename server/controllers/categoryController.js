const axios = require('axios');
const Category = require('../models/categoryModel');
const categoryData = require('../data/category.json');
require('dotenv').config(); // Load environment variables from .env file

const FLIPKART_API=process.env.FLIPKART_API;
class CategoryController {
  async searchAndStore(req, res) {
    try {
      const category = req.params.category;
      const categories = categoryData.field || [];

      if ( categories.indexOf(category) !== -1) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      const apiUrl = `${FLIPKART_API}/search/${category}`;
      const response = await axios.get(apiUrl);

      const dataToStore = {
        category: category,
        fetch_from: apiUrl,
        result: response.data.result
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
      const key = req.params.key.toLowerCase();
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
