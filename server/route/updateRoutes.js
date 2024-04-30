const express = require('express');
const router = express.Router();
const UpdateController = require('../controllers/updateController');

router.get('/updateDb', async (req, res) => {
    UpdateController.updateDbForCategory();
    res.status(200).json({ message: 'Database update triggered' });
  });
  
module.exports= router;