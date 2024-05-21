const express=require('express');
const AmazonController=require('../controllers/amazonController');
const router=express.Router();

router.get('/:key', async(req,res)=>{
        await AmazonController.integrateAmazonKey(req,res);
        res.status(200).json({"msg" : "done"});
});

router.get('/' , async(req,res)=>{
        AmazonController.integrateAmazon()
});

module.exports= router;