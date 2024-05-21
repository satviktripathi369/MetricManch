const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/search/:category', categoryController.searchAndStore.bind(categoryController));
router.get('/fetch/:key', categoryController.fetchByKey.bind(categoryController));

module.exports = router;
