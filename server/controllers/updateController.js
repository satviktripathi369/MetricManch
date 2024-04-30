const axios = require('axios');
const Category = require('../models/categoryModel');
const categoryData = require('../data/category.json');
require('dotenv').config(); 

const FLIPKART_API = process.env.FLIPKART_API;

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
async function updateDbForCategory() {
  try {
    const categories = categoryData.filed || [];
    console.log(categories);
    for (const category of categories) {
      console.log(`Updating database for category: ${category}`);

      const categoryDocs = await Category.find({ category : category });

      if (categoryDocs.length > 0) {
        for (const categoryDoc of categoryDocs) {
          for (const product of categoryDoc.result) {
            const productResponse = await axios.get(`${FLIPKART_API}/${product.query_url}`);

            const latestCurrentPrice = productResponse.data.current_price;

            if (latestCurrentPrice) {
              product.current_price.push(latestCurrentPrice);
              product.time.push(getFormattedToday());
            }
          }

          await categoryDoc.save();
        }
      } else {
        console.log(`Category '${category}' not found in the database`);
      }
    }

    console.log('Database updated successfully for all categories');
  } catch (error) {
    console.error('Error updating database for all categories:', error);
  }
}


module.exports = {
  updateDbForCategory
};
