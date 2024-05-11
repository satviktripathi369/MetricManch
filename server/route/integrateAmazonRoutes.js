const express=require('express');
const AmazonController=require('../controllers/amazonController');
const router=express.Router();

router.get('/' , async(req,res)=>{
        AmazonController.integrateAmazon()
}
);

module.exports= router;