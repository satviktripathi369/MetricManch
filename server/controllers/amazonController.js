const Category = require('../models/categoryModel');
const amazonScraper = require('amazon-buddy'); // Assuming you have a library for Amazon scraping

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
  
class AmazonController {

  async integrateAmazonKey(req, res) {
    const key=req.params.key;
    console.log(key);
  }
  async integrateAmazon(req, res) {
    try {
      // Fetch all categories from the database
      const categories = await Category.find();
      console.log("Started Amazon integeration");
      // Loop through each category
      for (const category of categories) {
        // Loop through each product in the category
        for (const product of category.result) {
          // Extract the first four words of the product name
          const newSearchString = product.name.split(' ').slice(0, 4).join(' ');
          // Search for the product on Amazon
          try{
            var products = await amazonScraper.products({ keyword: newSearchString, number: 3, country: 'IN' });
          }
          catch(error){
            console.log(newSearchString+ "  Not found "+error  )
            continue;
          }
          //console.log(products)
          // Assuming you want to update only if Amazon has a result
          if (products.result.length > 0) {
            const amazonProduct = products.result[1]; // Assuming you want the first result
            // Update the product document with Amazon data
            console.log(newSearchString , amazonProduct.price.current_price,amazonProduct.asin)
            product.current_price_az = [amazonProduct.price.current_price];
            product.thumbnail_az = amazonProduct.thumbnail;
            product.query_az_url = amazonProduct.url;
            product.description = amazonProduct.title;
            product.time_az = [getFormattedToday()];
            product.asin=amazonProduct.asin;
            product.az_thumbnail=amazonProduct.thumbnail
            // Save the updated product
            await category.save();
          }
        }
      }
      console.log("Ended Amazon integeration");
      res.status(200).json({ message: 'Amazon integration successful' });
    } catch (error) {
      console.error('Error integrating with Amazon:', error);
      if (res) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('Response object is undefined.');
      }
    }
  }
}

module.exports = new AmazonController();
